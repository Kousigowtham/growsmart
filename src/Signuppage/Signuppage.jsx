import React,{useState} from 'react'
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Slide, TextField,Radio ,RadioGroup,FormControlLabel ,FormControl ,FormLabel} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'
import {auth,createUserProfileDocument} from '../firebase/firebase.utilites.js'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const useStyles=makeStyles(()=>({
    inputfield:{
        marginLeft:'1rem',
        marginBottom:'1rem',
        maxWidth:'97%'
    },
    pincode:{
        marginBottom:'1rem',
        marginLeft:'1rem',
        display:'flex',
        justifyContent:'space-between'
    }

}))  

const Signuppage = () => {
    const classes= useStyles();
    const [open, setOpen] = useState(true);
    const [userData, setuserData] = useState({
        name:'',
        email:'',
        phoneNumber: '',
        gender:'female',
        city:'',
        pincode: '',
        password:''
    });

    const history=useHistory();


    const handleChange = (event) => {
      setuserData({...userData, [event.target.name] :event.target.value});
    };

    const handleClose = () => {
      setOpen(false)
      history.push('/');
    };
 
   const handleSubmit=async (event)=>{
        event.preventDefault();
    try{
        const {user} = await auth.createUserWithEmailAndPassword(userData.email,userData.password)
        createUserProfileDocument(user,userData)
        history.push('/home')
    }
    catch(error){
        alert(error)
    }
   }


    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <form onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title">{"SIGNUP"}</DialogTitle>
          <DialogContent>
            <TextField
                label='Name'
                name='name'
                value={userData.name}
                onChange={handleChange}
                type='text'
                autoFocus
                fullWidth
                className={classes.inputfield}
                required
            />
            <TextField
                label='EmailAddress'
                type='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                className={classes.inputfield}
                fullWidth
                required
            />
            <FormControl component="fieldset"  className={classes.inputfield} >
                <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={userData.gender} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio color='primary' />} label="Female" />
                        <FormControlLabel value="male" control={<Radio color='primary'/>} label="Male" />
                        <FormControlLabel value="other" control={<Radio color='primary'/>} label="Other" />
                    </RadioGroup>
            </FormControl>
            <TextField
                label='PhoneNumber'
                type='tel'
                name='phoneNumber'
                value={userData.phoneNumber}
                onChange={handleChange}
                className={classes.inputfield}
                fullWidth
            />
            <div className={classes.pincode}>
            <TextField
                label='City'
                type='text'
                name='city'
                value={userData.city}
                onChange={handleChange}
            />
            <TextField
                label='Pincode'
                type='number'
                name='pincode'
                value={userData.pincode}
                onChange={handleChange}
            />
            </div>
            <TextField
                label='Password'
                type='password'
                name='password'
                value={userData.password}
                className={classes.inputfield}
                onChange={handleChange}
                fullWidth
                required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined' color="secondary">
              Cancel
            </Button>
            <Button type='submit' variant='contained' color="primary">
              Signup
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );

}

export default Signuppage
