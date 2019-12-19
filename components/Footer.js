import React, {Component} from 'react'
import styled from 'styled-components';

class Footer extends Component {
  render() {
    return(
      <footer>
        <Hoge>{this.props.footer}</Hoge>
      </footer>
    );
  }
}
export default Footer;

const Hoge = styled.div`
  width:100%;
  background-color: aqua;
`;
