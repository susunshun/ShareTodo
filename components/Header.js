import React, {Component} from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    {/*　TODO: ハンバーガーいらん、タイトルと削除ボタンだけでよいかも　*/}
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {console.log('hage')}}>
                        <MenuIcon />
                    </IconButton>
                    {this.props.title}
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
