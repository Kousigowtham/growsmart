import {combineReducers} from 'redux'
import {UserReducer} from './UserReducer/UserReducer'
import {UserFormReducer} from './UserFormReducer/UserFormReducer'
import {reducer as formReducer} from 'redux-form'
export default  combineReducers({
    user: UserReducer,
    form: formReducer,
    userform: UserFormReducer
});