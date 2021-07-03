import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {Button,Grid,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio} from '@material-ui/core'
import Input from '../Input/Input'

const renderInput =({input,meta,type,label})=>(
    <Input input={input} type={type} label={label} errorMessage={meta.touched && meta.error}    />
)

const renderSelect =({input})=>(
    <FormControl component="fieldset" style={{marginLeft:'2rem',marginTop:'3rem'}}>
    <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" {...input}>
            <FormControlLabel value="female" control={<Radio color='primary' />} label="Female" />
            <FormControlLabel value="male" control={<Radio color='primary'/>} label="Male" />
            <FormControlLabel value="other" control={<Radio color='primary'/>} label="Other" />
        </RadioGroup>
</FormControl>
)

const validate= values =>{

    var errors={};

    if(!values.name)
        errors.name= "This field is required";
    if(!values.phoneNumber)
    {
        errors.phoneNumber = "This field is required"
    }else if(isNaN(values.phoneNumber.trim().replace('+','').replace(' ',''))){
        errors.phoneNumber = "Phone Number only contains digits"
    }else if(values.phoneNumber.trim().length !== 10){
            const ph= values.phoneNumber.trim().replace('+91','').replace(' ','');
            if(ph.length !==10)
            errors.phoneNumber = "Phone Number must be in 10 digits"
    }
    
    if(!values.pincode){
    errors.pincode = "This field is required"
    }else if(values.pincode.trim().replace(' ','').length !== 6){
    errors.pincode = "pincode must be in 6 digits"
    }

    return errors;
}


const Form = ({handleSubmit,submitting,pristine,valid,initialValues,type}) => {

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Grid container >
                    <Grid item  xs={12} md={6}>
                        <Field label='UserName'  name='name' type='text' component={renderInput} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field label='EmailAddress' name='email' type='email' component={renderInput} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field label='PhoneNumber'  name='phoneNumber' type='tel' component={renderInput}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field label='City' name='city' type='text' component={renderInput}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field label='Pincode' name='pincode' type='number' component={renderInput}/>
                    </Grid>                    
                    <Grid item xs={12} md={6}>
                        <Field name='gender'  component={renderSelect}/>
                    </Grid>
                </Grid>
                <Grid item style={{marginTop:'3rem',marginLeft:'2rem'}}>
                    <Button variant='contained' type='submit' color='primary'disabled={submitting || pristine || !valid} >{ type=== 'EDIT' ? 'SAVE' : 'CREATE'}</Button>
                </Grid>
            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'adduser',
    validate,
})(Form)
