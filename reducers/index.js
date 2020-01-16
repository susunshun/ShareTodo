import { combineReducers } from 'redux'
import todos from './todos'
import todo from './todo'
import error from "./error";
import modal from "./modal";
import create from "./create";
import visibilityFilter from './visibilityFilter'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    todos,
    todo,
    error,
    modal,
    create,
    visibilityFilter,
    form: formReducer
})
