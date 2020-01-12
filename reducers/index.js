import { combineReducers } from 'redux'
import todos from './todos'
import todo from './todo'
import error from "./error";
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    todos,
    todo,
    error,
    visibilityFilter
})
