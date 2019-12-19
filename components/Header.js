import React, {Component} from 'react';
import styled from 'styled-components';

class Header extends Component {
  render(){
    return(
      <Root>
        <div>{this.props.header}</div>
        <HeaderText>{this.props.title}</HeaderText>
      </Root>
    );
  }
}
export default Header;

const Root = styled.div`
  height: 100px;
  background-color: aquamarine;
`;

const HeaderText = styled.div`
        font-size: 60pt;
        font-weight: bold;
        text-align: right;
        letter-spacing: -8px;
        color: #f0f0f0;
        margin: -32px 10px;
`;