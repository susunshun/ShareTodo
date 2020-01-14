import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import DetailForm from "./DetailForm";

class Detail extends React.Component {
    componentDidMount() {
        this.props.fetchDetail(this.props.id);
    }

    submit = v => {
        console.log(v)
    }

    render() {
        return (
            <Root>
                <DetailForm onSubmit={this.submit} initialValues={{text: this.props.todo.text, memo: this.props.todo.memo}} />
                {/*<InputArea*/}
                {/*    type="text"*/}
                {/*    defaultValue=""*/}
                {/*    placeholder="Todoを追加"*/}
                {/*    value={this.props.todo.text}*/}
                {/*    ref="inputText"/>*/}
                {/*<TextField id="standard-basic" label="todo" value={this.props.todo.text}/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<TextField id="outlined-basic" label="Outlined" value={this.props.todo.memo}/>*/}
            </Root>
        )
    }
}

Detail.propTypes = {
    id: PropTypes.string.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};

export const Root = styled.div`
  padding: 20px;
`;

export const InputArea = styled.input`
  font-size: 20px;
  ::placeholder {
    font-size: 13px;
  }
  outline: none;
  :focus {
    border: 0px;  
  }
  border:none;
  background:none;
  -webkit-appearance:none;
  width: 100%;
`;

export default Detail