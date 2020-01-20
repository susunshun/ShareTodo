import React from 'react'
import Modal from 'styled-react-modal'
import styled from "styled-components";
import {green} from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from '@material-ui/core/Button';

class ShareModal extends React.Component {
    render() {
        return (
            <Root
                isOpen={this.props.modalIsOpen && this.props.modalType === 'SHARE'}
                onBackgroundClick={() => this.props.toggleModal()}
                onEscapeKeydown={() => this.props.toggleModal()}>
                <Content>
                    <Description>このURLでTODOリストを共有できます</Description>
                    <ShareUrl>
                        <span>{"https://nextapp.susunshun.now.sh/todo/" + this.props.shareId}</span>
                    </ShareUrl>
                    <ShareButton>
                        <Button variant="contained" style={{color: green[500]}}>
                            <CheckCircleOutlineIcon style={{color: green[500]}}/>
                            コピーする
                        </Button>
                    </ShareButton>
                </Content>
            </Root>
        )
    }
}

ShareModal.propTypes = {};

export const Root = Modal.styled`
    width: 90%;
    // height: 100px;
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

export const ShareButton = styled(Button)`
    display: flex;
    justify-content: center;
`;


export default ShareModal