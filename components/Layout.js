import React, {Component} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

class Layout extends Component {
  render() {
    return(
      <Root>
        <Head>
          <title>{this.props.title}</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width-device-width' />
        </Head>
        <Header header={this.props.header} title={this.props.title}/>
        {this.props.children}
        <Footer footer="最高のフッター"/>
      </Root>
    )
  }
}

export const Root = styled.div`
  background-color: #b0c4de;
`;

export default Layout;
