import Link from "next/link";
import Layout from '../containers/Layout';
import Image from '../components/Image';
import React from "react";
import styled from 'styled-components';
import Create from "../containers/Create";

export default () => {
    return (
        <Layout title="Create page">
            <Content>
                <Create />
            </Content>
        </Layout>
    )
};

export const Content = styled.div`
    padding: 10px;
`;

export const TestText = styled.div`
  font-size: 20px;
`;