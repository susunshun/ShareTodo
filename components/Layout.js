import React, {Component} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import styled from 'styled-components';

class Layout extends Component {
  render() {
    return (
      <Root {...this.props}>
        <Head>
          <title>{this.props.title}</title>
          <link rel='icon' href='../static/favicon.ico'/>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, minimum-scale=1.0, min-width-device-width'/>
        </Head>
        {this.props.error.code ? <Header/> :
          <Header iconColor={this.props.iconColor} hideHeader={this.props.hideHeader} title={this.props.title}
                  deleteId={this.props.deleteId} back={this.props.back}/>}
        <Content>{Page(this.props.error, this.props.children)}</Content>
        <br/>
      </Root>
    )
  }
}

function Page(error, children) {
  if (error) {
    switch (error.code) {
      case 404:
        // TODO: component作ってそれ返すようにする、<NotFound />的な
        return "ページが見つかりません";
      default:
        break;
    }
  }
  return children;
}

export const Root = styled.div`
    background-color: #b0c4de;
    min-height: 100vh;
    background-image: url(".././static/${props => props.backgroundImage}");
    background-size:cover;
`;

export const Content = styled.div`
    padding: 10px;
`;

export default Layout;
