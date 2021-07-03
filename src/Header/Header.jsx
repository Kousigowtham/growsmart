import React,{useState,useEffect} from 'react'
import {AppBar,Toolbar,Tabs,Tab,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Logo from '../Assets/Logo.png'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {auth} from '../firebase/firebase.utilites.js'


const useStyles = makeStyles(()=>({
    btn:{
        padding:'0',
        "&:hover":{
            backgroundColor: 'transparent'
        }
    },
    tabs:{
        marginLeft: 'auto',
    },
    tab:{
        color:'white',
        textDecoration:'none'
    },
    lgbtn:{
        borderRadius:'2rem',
        color:'white',
        backgroundColor:'transparent',
        marginRight:'1rem',
    },
    sgbtn:{
        backgroundColor: '#90d5ec',
        backgroundImage: 'linear-gradient(315deg, #90d5ec 0%, #fc575e 74%)',
        borderRadius:'2rem',
        color:'white',
        marginRight:'1rem',
    }
}))

const Header = ({currentUser}) => {

    const [value, setValue] = useState(0);

    const classes=useStyles();

    const handleChange = (event,newValue) => {
        setValue(newValue);
      };


    useEffect(()=>{
        if(window.location.pathname === '/' && value !==0)
            setValue(0)
        else if(window.location.pathname === '/users' && value !==1)
            setValue(1)
        else if(window.location.pathname === '/about' && value !==2)
            setValue(2)
    },[value])

    return (
        <React.Fragment>
            <AppBar  color='primary'>
                <Toolbar disableGutters={true}>
                    <Button disableRipple className={classes.btn}><img src={Logo} alt='Company logo' height='50px' width='40px'/></Button>
                    <Tabs indicatorColor='primary' value={value} onChange={handleChange} className={classes.tabs}>
                        <Tab className={classes.tab} component={Link} to='/'  label='Home'  />
                        <Tab className={classes.tab} component={Link} to='/users' label='Users' />
                    </Tabs>
                    { currentUser ? 
                    <Button variant='contained' className={classes.lgbtn} onClick={()=>auth.signOut()} color='secondary'>Signout</Button>
                        :
                    <div>
                    <Button variant='outlined' className={classes.lgbtn}  component={Link} to='/login' >Login</Button>
                    <Button variant='contained' className={classes.sgbtn}  component={Link} to='/signup' color='secondary'>SIGNUP</Button>
                    </div>
                    }      
                </Toolbar>
            </AppBar>
            
        </React.Fragment>
    )
}


const mapsStateToProps= state=>({
    currentUser: state.user.currentUser
})

export default connect(mapsStateToProps)(Header)
