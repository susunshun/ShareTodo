import React from 'react'
import Modal from 'styled-react-modal'
import DetailForm from "./DetailForm";

class DetailModal extends React.Component {
    render() {
        return (
            <Root
                isOpen={this.props.modalIsOpen}
                onBackgroundClick={() => this.props.toggleModal(this.props.todo)}
                onEscapeKeydown={() => this.props.toggleModal(this.props.todo)}>
                <DetailForm
                    onSubmit={(v) => this.props.toggleModal(this.props.todo)}
                    deleteTodo={() => this.props.deleteTodo(this.props.todo.id)}
                    close={() => this.props.toggleModal(this.props.todo)}
                    update={() => this.props.toggleModal(this.props.todo)}
                    initialValues={{text: this.props.todo.text, memo: this.props.todo.id}}
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