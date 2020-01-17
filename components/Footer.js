import React, {Component} from 'react'
import styled from 'styled-components';

class Footer extends Component {
  render() {
    return(
        <Root>{this.props.footer}</Root>
    );
  }
}
export default Footer;

const Root = styled.footer`
  width:100%;
  background-color: white;
`;
