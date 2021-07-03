import React,{useState,useEffect} from 'react'
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Slide, TextField} from '@material-ui/core';
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/styles'
import {useHistory} from 'react-router-dom'
import {auth} from '../firebase/firebase.utilites.js'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const useStyles =makeStyles(()=>({
    input:{
      marginBottom:'1rem'
    }
  }))

const Loginpage = ({currentUser}) => {
    
  const classes= useStyles();
    
    const [open, setOpen] = useState(true);
    const [userData, setuserData]= useState({
        name:'',
        password:''
    })
    const history=useHistory();
    const handleClose = () => {
      history.push('/');
    };
 
    const handleChange = (event) => {
        setuserData({...userData, [event.target.name] :event.target.value});
      };


    const submitHandler=async (event)=>{
        event.preventDefault();
        try{
            await auth.signInWithEmailAndPassword(userData.name, userData.password)
            setuserData({
                name:'',
                password:''})
            history.push('/home');
        }
        catch(error){
            alert(error)
        }

    }

 useEffect(()=>{
     if(currentUser !== null && currentUser !== undefined)
        setOpen(false)
    else
        setOpen(true)
 },[currentUser])
    

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
        <form onSubmit={submitHandler}>
          <DialogTitle id="alert-dialog-slide-title">{"LOGIN"}</DialogTitle>
          <DialogContent>
            <TextField
                label='EmailAddress'
                type='text'
                name='name'
                value={userData.name}
                onChange={handleChange}
                autoFocus
                fullWidth
                required
                className={classes.input}
            />
            <TextField
                label='Password'
                type='password'
                name='password'
                value={userData.password}
                onChange={handleChange}
                fullWidth
                className={classes.input}
                required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined' color="secondary">
              Cancel
            </Button>
            <Button type='submit' variant='contained' color="primary">
              Login
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
}

const mapsStateToProps= state =>({
    currentUser: state.user.currentUser
})

export default connect(mapsStateToProps)(Loginpage)
