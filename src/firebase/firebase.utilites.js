import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBpdSmNrdok5ByXu0rEXKKilDnTrFvVxrk",
    authDomain: "blogsite-f8e97.firebaseapp.com",
    projectId: "blogsite-f8e97",
    storageBucket: "blogsite-f8e97.appspot.com",
    messagingSenderId: "163065435499",
    appId: "1:163065435499:web:9f2ded5e35f7d3af69682e"
  };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
        firebase.app(); // if already initialized, use that one
     }

export const firestore= firebase.firestore();
export const auth=firebase.auth()


export const createUserProfileDocument = async (userAuth, AdditionalData)=>{

    if(!userAuth) return;

    const userRef = firestore.doc(`usersc/${userAuth.uid}`);
    const userSnap= await userRef.get();

    if(!userSnap.exists){

        const {email} = userAuth;
        const createdAt= new Date();

        userRef.set({
            email,
            createdAt,
            ...AdditionalData
        })
    }

    return userRef;
}

export const fetchUsers= async ()=>{

    const usersRef=  firestore.collection('userList');
    const userSnap= await usersRef.get()

    return userSnap.docs.map(doc=> doc.data()) 
}

export const setUser = async (values)=>{
    const usersRef=  firestore.collection('userList');
    const userSnap= await usersRef.get()
    const createdAt= new Date();
    

    if(!userSnap.exists)
    {
        const docs= userSnap.docs;
        values.userid=`user${docs.length+1}`;
        values.createdAt=createdAt;
        const DocRef = firestore.doc(`userList/user${docs.length+1}`);
        DocRef.set(values)
    }
}
export const editUser = async (value)=>{

    const usersRef=  firestore.doc(`userList/${value.userid}`);
    const userSnap= await usersRef.get()
    const modifiedAt= new Date();
    value.modifiedAt=modifiedAt;

    if(userSnap.exists)
        await usersRef.set(value)
}
export const deleteUser = async (value)=>{
    const usersRef=  firestore.doc(`userList/${value.userid}`);
    const userSnap= await usersRef.get()

    if(userSnap.exists)
        usersRef.delete()
}


export default firebase;

