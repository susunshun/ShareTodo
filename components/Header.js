import React, {Component} from 'react';
import styled from 'styled-components';
import DeleteTodo from "../containers/DeleteTodo"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Header extends Component {
    render() {
        return (
            <Root {...this.props}>
                {this.props.hideHeader ? '' :
                        <div>
                            {this.props.deleteId ? <ArrowBackIcon onClick={this.props.back}/> : ''}
                            <Title>
                                <img height="40px;" src={"../static/logo_" + this.props.iconColor + ".png"}/>
                            </Title>
                            <Delete>
                                {this.props.deleteId ?
                                    <DeleteTodo id={this.props.deleteId} back={this.props.back}/> : ''}
                            </Delete>
                        </div>
                }
            </Root>
        );
    }
}

export const Root = styled.div`
    z-index: 100;
    position:fixed;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 50px;
    padding: 10px;
`;

export const Title = styled.div`
   width: 100%;
   text-align: center; 
`;


export const Delete = styled.div`
    margin: 0 0 0 auto;
`;

export default Header;
