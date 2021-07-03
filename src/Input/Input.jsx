import React from 'react'
import './Input.scss'


const Input = ({input,label,type,errorMessage}) => {


    return (
        <React.Fragment>
            <div className='InputContainer'>
            <label className='label'>{label}</label>
            <input {...input} required type={type} className='input'/>
            {errorMessage && <span className='Error'>{`* ${errorMessage}`}</span>}
            </div>
        </React.Fragment>
    )
}

export default Input
