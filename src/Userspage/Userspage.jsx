import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Button } from '@material-ui/core';
import {fetchUsers,deleteUser} from '../firebase/firebase.utilites.js'
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import {Link , useHistory} from 'react-router-dom'
import {connect } from 'react-redux'
import { setUserForm } from '../Redux/UserFormReducer/UserFormAction'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import ReorderIcon from "@material-ui/icons/Reorder";

const useStyles=makeStyles(()=>({
  table:{
    margin: '2rem auto',
    maxWidth: '95%'
  },
  tablerow:{
    '&:hover':{
      backgroundColor:'rgba(0,0,0,0.1)',
      cursor:'pointer'
    }
  },
  adduser:{
    display:'flex',
    justifyContent:'flex-end'
    },

    btn:{
      margin:'2rem 2rem 0 0',
      backgroundColor:'#2979ff',
      color:'white'

  }
}))





const Userspage =({setUserForm})=>{

  const classes= useStyles();
  const history = useHistory();
  const [userList, setuserList] = useState(null);
  const [updated, setupdated] = useState(false)

  const DeleteHandler= async (event, value)=>{
    event.stopPropagation()
    const isDelete= window.confirm('Are you sure, you want to delete the user?')
    if(isDelete === true){
      console.log(isDelete)
      await deleteUser(value);
      setupdated(true);
    } 
}
const EditHandler= async(event,value)=>{
  setUserForm(value)
  history.push('/edituser')
}

const handleDragEnd = (result, provided) => {
  if (!result.destination) {
    return;
  }
  if (result.destination.index === result.source.index) {
    return;
  }

  setuserList((prev) => {
    const temp = [...prev];
    const d = temp[result.destination.index];
    temp[result.destination.index] = temp[result.source.index];
    temp[result.source.index] = d;

    return temp;
  });
};

  useEffect(()=>{

    fetchUsers().then(users => setuserList(users)).catch(error=> alert(error))

  },[])

  useEffect(()=>{
    if(updated===true)
    {
      fetchUsers().then(users => setuserList(users)).catch(error=> alert(error))
      setupdated(false)
    }

  },[updated])

    return(
        <React.Fragment>

        <div className={classes.adduser}>
          <Button component={Link} to='/adduser' className={classes.btn} variant='contained' color='primary'>ADD USER</Button>
        </div>
    <TableContainer className={classes.table} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">EmailAddress</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
            <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId='userlist-drop'
              direction="vertical"
            >
              {(droppableProvided)=>(
                <TableBody ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}> 
                  {(userList !== null && userList !==undefined) ?  userList.map((u,index) => (
                  <Draggable
                      draggableId={u.userid + u.name}
                      key={u.userid + u.name}
                      index={index}
                  >
                    { (draggableProvided, snapshot)=>{
                        return(
                    <TableRow ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}  onClick={(event)=>EditHandler(event,u)} className={classes.tablerow} key={u.userid}>
                      <TableCell align="center">
                            <div {...draggableProvided.dragHandleProps}>
                              <ReorderIcon />
                            </div></TableCell>
                      <TableCell align="center">{u.name}</TableCell>
                      <TableCell align="center">{u.gender}</TableCell>
                      <TableCell align="center">{u.email}</TableCell>
                      <TableCell align="center" style={{backgroundColor:'white',pointerEvents:'none'}}><IconButton style={{pointerEvents:'auto'}}><DeleteIcon onClick={(event)=>DeleteHandler(event,u)}style={{ color: red[500] }}/></IconButton></TableCell>
                    </TableRow>
                  );
                  }}
                  </Draggable>
                  )) : <p>Loading...</p>}
                  {droppableProvided.placeholder}
                </TableBody>
              )}
            </Droppable>
            </DragDropContext>
      </Table>
    </TableContainer>
        </React.Fragment>
    );

}

const mapDispatchToProps = dispatch =>({

  setUserForm : user => dispatch(setUserForm(user))

})

export default connect(null,mapDispatchToProps)(Userspage)