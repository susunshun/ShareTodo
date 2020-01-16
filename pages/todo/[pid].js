import Link from "next/link";
import Layout from '../../containers/Layout'
import React from "react";
import { useRouter } from 'next/router'
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
                <TodoList pid={pid}/>
                <Filter/>
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
