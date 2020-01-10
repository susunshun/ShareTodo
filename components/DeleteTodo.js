import React from 'react'
import styled from "styled-components";
import Delete from '@material-ui/icons/Delete';

class DeleteTodo extends React.Component {
    render() {
        return (
            <Root>
                <Delete onClick={() => {
                    this.props.deleteTodo(this.props.id);
                    this.props.back();
                }} />
            </Root>
        )
    }
}

DeleteTodo.propTypes = {
    // TODO: validation記載
};

export const Root = styled.div`
`;

export default DeleteTodo