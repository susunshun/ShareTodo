import React from 'react'
import styled from "styled-components";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

/**
 * ReduxFormのFieldと、エラーメッセージを出力する機能を組み合わせたテンプレート
 */
export class RenderField extends React.Component {
    render() {
        const {input, label, type, meta: {touched, error, warning}} = this.props;
        return (
            <Root>
                {type === 'textarea' ?
                    <TextArea aria-label="empty textarea" {...input} placeholder={label} type={type}/>
                    // <textarea {...input}  placeholder={label} type={type} />
                    : type === 'select' ?
                        <select {...input} type={type}>{this.props.children}</select>
                        :
                        <Input {...input} type={type} placeholder={label}/>
                }
                {((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </Root>
        );
    }
}

export const Root = styled.div`
    display: inline-block;
      width: 100%;
`;

export const Input = styled.input`
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
  // padding-top: 5px;
`;