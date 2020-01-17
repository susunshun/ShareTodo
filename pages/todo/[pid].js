import Layout from '../../containers/Layout'
import React from "react";
import {useRouter} from 'next/router'
import TodoList from "../../containers/TodoList"
import AddTodo from "../../containers/AddTodo"
import Filter from "../../components/Filter";
import styled from "styled-components";

export default () => {
    const router = useRouter();
    const {pid} = router.query;

    return (
        <Layout title={pid}>
            <Content>
                <AddTodo pid={pid}/>
                <Filter/>
                <TodoList pid={pid}/>
            </Content>
        </Layout>
    )
};

export const Content = styled.div`
    min-height: 100vh;
    padding: 70px 10px 10px 10px;
    background-image: url(".././static/background2.jpeg");
    background-size:cover;
`;

export const TestText = styled.div`
  font-size: 20px;
`;
