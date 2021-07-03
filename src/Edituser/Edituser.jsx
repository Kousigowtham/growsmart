import React from 'react'
import Form from '../Form/Form'
import {editUser} from '../firebase/firebase.utilites.js'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'




const Edituser = ({userForm}) => {

    const history=useHistory();
    const handleSubmit=async (values)=>{
        try
        {
            await editUser(values).then(response => console.log(response))
            alert('successfully Edited');
            history.push('/users');
        }
        catch(error)
        {
            alert(error)
        }
    
    }

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} initialValues={userForm} type='EDIT'/>
        </React.Fragment>
    )
}

const mapsStateToProps= state =>({

    userForm: state.userform.userForm
})

export default connect(mapsStateToProps)(Edituser)
