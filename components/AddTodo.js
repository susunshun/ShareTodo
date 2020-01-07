import React from 'react'
import PropTypes from 'prop-types'
import {addTodo} from "../actions";

class AddTodo extends React.Component {
    render() {
        const {userPost} = this.props;

        return (
            <div>
                <input
                    type="text"
                    defaultValue=""
                    value={userPost}
                    ref="inputText"/>
                <button onClick={() => {
                    this.props.addTodo(this.refs.inputText.value);
                    this.refs.inputText.value = ''
                }}>
                    Add Todo
                </button>
            </div>

        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default AddTodo