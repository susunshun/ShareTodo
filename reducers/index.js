import { combineReducers } from 'redux'
import todos from './todos'
import todo from './todo'
import error from "./error";
import modal from "./modal";
import visibilityFilter from './visibilityFilter'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    todos,
    todo,
    error,
    modal,
    visibilityFilter,
    form: formReducer
})
