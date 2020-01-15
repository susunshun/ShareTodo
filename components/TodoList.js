import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import {Container, Draggable} from 'react-smooth-dnd'
import Modal from 'styled-react-modal'
import DetailForm from "./DetailForm";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            todo: {}
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(todo) {
        // TODO: containerからstate触るようにする
        console.log('open')

        this.setState({modalIsOpen: true, todo: todo});
    }

    closeModal(v) {
        console.log(v)
        // TODO: containerからstate触るようにする
        let startMsec = new Date();
        // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
        while (new Date() - startMsec < 500) ;
        this.setState({modalIsOpen: false});
    }

    toggleModal() {
        let startMsec = new Date();
        while (new Date() - startMsec < 500) ;
        this.setState({modalIsOpen: !this.state.modalIsOpen});
    }

    componentDidMount() {
        this.props.fetchTodo();
    }

    render() {
        return (
            <div>
                <DetailModal
                    isOpen={this.state.modalIsOpen}
                    onBackgroundClick={() => this.toggleModal()}
                    onEscapeKeydown={() => this.toggleModal()}>
                    <DetailForm
                        onSubmit={(v) => this.closeModal(v)}
                        deleteTodo={() => {
                            window.alert('delete!')
                            this.toggleModal()
                        }}
                        close={() => this.toggleModal()}
                        update={() => this.toggleModal()}
                        initialValues={{text: this.state.todo.text, memo: this.state.todo.id}}/>
                </DetailModal>
                <Container onDrop={(dropResult) => this.props.onDrop(dropResult)}>
                    {this.props.todos.map(todo => {
                        return (
                            <Draggable key={todo.id}>
                                <Todo {...todo}
                                      toggleTodo={() => this.props.toggleTodo(todo.id, todo.completed)}
                                      onClick={() => this.openModal(todo)}/>
                            </Draggable>
                        );
                    })}
                </Container>
            </div>
        )
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            order: PropTypes.number,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired,
};

export const DetailModal = Modal.styled`
  width: 90%;
  display: flex;
  align-items: flex-start;;
  background-color: white;
  border-radius: 5px;
`;

export default TodoList