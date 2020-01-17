import Link from "next/link";
import Layout from '../containers/Layout';
import Image from '../components/Image';
import React from "react";
import styled from 'styled-components';
import Create from "../containers/Create";

export default () => {
    return (
        <Layout hideHeader={true} title="TODOリストの作成">
            <Content>
                <Create />
            </Content>
        </Layout>
    )
};

export const Content = styled.div`
    padding: 10px;
    height: 100vh;
    background-image: url("./static/background2.jpeg");
    background-size:cover;
`;

export const TestText = styled.div`
  font-size: 20px;
`;