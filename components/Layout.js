import React, {Component} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

class Layout extends Component {
    render() {
        return (
            <Root>
                <Head>
                    <title>{this.props.title}</title>
                    <meta charSet='utf-8'/>
                    <meta name='viewport' content='initial-scale=1.0, width-device-width'/>
                </Head>
                {this.props.error.code ? <Header /> : <Header title={this.props.title} deleteId={this.props.deleteId} back={this.props.back} />}
                {Page(this.props.error, this.props.children)}
                <br/>
                <Footer footer="最高のフッター"/>
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
`;

export default Layout;
