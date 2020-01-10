import React, {Component} from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteTodo from "../containers/DeleteTodo"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Header extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    {this.props.deleteId ? <ArrowBackIcon onClick={this.props.back}/> : ''}
                    <Title>{this.props.title}</Title>
                    <Delete>
                        {this.props.deleteId ? <DeleteTodo id={this.props.deleteId} back={this.props.back}/> : ''}
                    </Delete>
                </Toolbar>
            </AppBar>
        );
    }
}

export const Title = styled.div`
   width: 100%;
   text-align: center; 
`;


export const Delete = styled.div`
    margin: 0 0 0 auto;
`;

export default Header;
