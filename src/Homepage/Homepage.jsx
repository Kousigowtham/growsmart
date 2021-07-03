import React from 'react'
import './Homepage.scss'
import {Button,Grid,Card,CardContent,Typography } from '@material-ui/core'
import{Link} from 'react-router-dom'
import CRUD from '../Assets/CRUD.png'
import Drag from '../Assets/Drag.png'
import More from '../Assets/More.png'

const Homepage =()=>{

    return(
        <React.Fragment>
            <div className='homeContainer'>
            <div className='imgContainer'>
             <div className='homeBg' />
             <div className='bodyContainer'>
                 <div>Want to <span className='highlight'>E</span>xplore users in our Community
                 <Button className='btn' component={Link} to='/users' variant='outlined' >Click Here</Button>
                 </div>
             </div>
            </div>
            <div className='ser-container'>
            <div className='ser-div'> Our Services</div>
            <Grid container justify='center' align='center'>
                <Grid item xs={12} sm={6} md={4} className='card' component={Card}>
                <CardContent>
                    <Typography  className='ser-div' color="primary" gutterBottom>
                     CRUD
                    </Typography>
                    <img src={CRUD} alt='CRUD' height='150px' width='180px'/>
                    <Typography  variant='body1' color="primary" gutterBottom>
                     create,Read,Update and delete users
                    </Typography>
                </CardContent>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className='card' component={Card}>
                <CardContent>
                    <Typography variant='h5' className='ser-div' color="primary" gutterBottom>
                     Drag/Drop
                    </Typography>
                    <img src={Drag} alt='drag' height='150px' width='180px'/>
                    <Typography  variant='body1' color="primary" gutterBottom>
                     sort users by drag/drop
                    </Typography>
                </CardContent>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className='card'  component={Card}>
                <CardContent>
                    <Typography variant='h5' className='ser-div' color="primary" gutterBottom>
                     More...
                    </Typography>
                    <img src={More} alt='more' height='150px' width='180px'/>
                    <Typography  variant='body1' color="primary" gutterBottom>
                     need more...contact us
                    </Typography>
                </CardContent>
                </Grid>
            </Grid>
            </div>
            </div>
        </React.Fragment>
    );

}

export default Homepage