import React from 'react';
import Modal from 'styled-react-modal';
import styled from "styled-components";
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';

class ShareModal extends React.Component {
    copyToClipboard = (text) => {
        let textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    render() {
        const shareUrl = "https://nextapp.susunshun.now.sh/todo/" + this.props.shareId;
        return (
            <Root
                isOpen={this.props.modalIsOpen && this.props.modalType === 'SHARE'}
                onBackgroundClick={() => this.props.toggleModal()}
                onEscapeKeydown={() => this.props.toggleModal()}>
                <Content>
                    <Description>このURLでTODOリストを共有できます</Description>
                    <ShareUrl>
                        <span>{shareUrl}</span>
                    </ShareUrl>
                    <ShareButton>
                        {this.props.copied ?
                            <Button color="secondary">
                                <DoneIcon />コピーしました
                            </Button>
                            : <Button color="primary" onClick={() => {
                                this.copyToClipboard(shareUrl);
                                this.props.toggleCopy();
                            }}>
                                コピーする
                            </Button>}
                    </ShareButton>
                </Content>
            </Root>
        )
    }
}

ShareModal.propTypes = {};

export const Root = Modal.styled`
    width: 90%;
    background-color: white;
    border-radius: 5px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const Description = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const ShareUrl = styled.div`
    font-family: inherit;
    color: inherit;
    width: 100%;
    padding: 0px;
    font-size: 13px;
    overflow:scroll;
    overflow-wrap: normal;
    margin-bottom: 20px;
`;

export const ShareButton = styled.div`
    display: flex;
    justify-content: center;
`;


export default ShareModal