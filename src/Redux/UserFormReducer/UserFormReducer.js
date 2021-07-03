const INITIAL_STATE ={
    userForm: null
}

export const UserFormReducer =(state=INITIAL_STATE, action)=>{

    switch(action.type){

        case 'SET_USER_FORM' :
            return{
                    ...state,
                    userForm: action.payload
            }
            default:
                return state;
    }

}