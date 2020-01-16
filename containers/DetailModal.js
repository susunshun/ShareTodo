import React from 'react'
import {connect} from 'react-redux'
import {toggleModal, deleteTodo} from '../actions';
import DetailModal from "../components/DetailModal";

const mapStateToProps = state => ({
    modalIsOpen: state.modal.modalIsOpen,
    todo: state.modal.todo
});

const mapDispatchToProps = dispatch => ({
    toggleModal: (todo) => dispatch(toggleModal(todo)),
    deleteTodo: (id) => dispatch(deleteTodo(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailModal)


// openModal(todo) {
//     // TODO: containerからstate触るようにする
//     console.log('open')
//
//     this.setState({modalIsOpen: true, todo: todo});
// }
//
// closeModal(v) {
//     console.log(v)
//     // TODO: containerからstate触るようにする
//     let startMsec = new Date();
//     // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
//     while (new Date() - startMsec < 500) ;
//     this.setState({modalIsOpen: false});
// }
//
// toggleModal() {
//     let startMsec = new Date();
//     while (new Date() - startMsec < 500) ;
//     this.setState({modalIsOpen: !this.state.modalIsOpen});
// }