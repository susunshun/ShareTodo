import Layout from '../containers/Layout';
import React from "react";
import styled from 'styled-components';
import Create from "../containers/Create";

export default () => {
    return (
        <Layout title="TODOリストの作成" backgroundImage="background_memo.jpg" iconColor="black">
            <Content>
                <Create />
            </Content>
        </Layout>
    )
};

export const Content = styled.div`
    height: 100vh;
`;
