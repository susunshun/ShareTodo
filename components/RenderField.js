import React from 'react'
import styled from "styled-components";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

/**
 * ReduxFormのFieldと、エラーメッセージを出力する機能を組み合わせたテンプレート
 */
export class RenderField extends React.Component {
  render() {
    const {input, label, type, color, meta: {touched, error, warning}} = this.props;
    return (
      <Root>
        {type === 'textarea' ?
          <TextArea aria-label="empty textarea" {...input} placeholder={label} type={type} rows="3"/>
          // <textarea {...input}  placeholder={label} type={type} />
          : type === 'select' ?
            <select {...input} type={type}>{this.props.children}</select>
            :
            <Input {...input} type={type} placeholder={label} color={color}/>
        }
        {((error && <Error>{error}</Error>) || (warning && <span>{warning}</span>))}
      </Root>
    );
  }
}

export const Root = styled.div`
    display: inline-block;
    width: 100%;
`;

export const Input = styled.input`
  font-family : inherit;
  font-size: 16px;
  ::placeholder {
    font-size: 16px;
  }
  outline: none;
  :focus {
    border: 0px;  
  }
  border:none;
  background:none;
  -webkit-appearance:none;
  width: 100%;
  color: ${props => props.color};
`;

export const TextArea = styled(TextareaAutosize)`
  outline: none;
  :focus {
    border: 0px;
  }
  border:none;
  background:none;
  -webkit-appearance:none;
  width: 100%;
  line-height: 1.5em;
`;

export const Error = styled.div`
    color: red;
    font-size: 8px;
`;