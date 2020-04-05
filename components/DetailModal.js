import React from 'react'
import Modal from 'styled-react-modal'
import DetailForm from "./DetailForm";

class DetailModal extends React.Component {
  render() {
    return (
      <Root
        isOpen={this.props.modalIsOpen && this.props.modalType === 'TODO'}
        onBackgroundClick={() => this.props.toggleModal(this.props.todo)}
        onEscapeKeydown={() => this.props.toggleModal(this.props.todo)}>
        <DetailForm
          onSubmit={todo => this.props.updateTodo(todo, this.props.pid)}
          deleteTodo={() => this.props.deleteTodo(this.props.todo.id, this.props.pid)}
          close={() => this.props.toggleModal(this.props.todo)}
          // update={todo => this.props.updateTodo(todo)}
          initialValues={this.props.todo}
        />
      </Root>
    )
  }
}

DetailModal.propTypes = {};

export const Root = Modal.styled`
  width: 90%;
  display: flex;
  align-items: flex-start;;
  background-color: white;
  border-radius: 5px;
`;

export default DetailModal