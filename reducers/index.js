import { combineReducers } from 'redux'
import todos from './todos'
import todo from './todo'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    todos,
    todo,
    visibilityFilter
})
