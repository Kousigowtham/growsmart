import React from 'react'
import Form from '../Form/Form'
import './Adduser.scss'
import {setUser} from '../firebase/firebase.utilites.js'
import {useHistory} from 'react-router-dom'




const Adduser = () => {

    const history=useHistory();
    const handleSubmit=async (values)=>{
        try
        {
            await setUser(values)
            alert('successfully added');
            history.push('/users');
        }
        catch(error)
        {
            alert(error)
        }
    
    }

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}/>
        </React.Fragment>
    )
}

export default Adduser
