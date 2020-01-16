import Link from "next/link";
import Layout from '../containers/Layout';
import Image from '../components/Image';
import React from "react";
import styled from 'styled-components';
import VisibleTodoList from "../containers/TodoList"
import AddTodo from "../containers/AddTodo"
import Filter from "../components/Filter";

export default () => {
    return (
        <Layout title="買い物リスト">
            <Content>
                <AddTodo/>
                <VisibleTodoList/>
                <Filter/>
                <Image fileName="mokumoku.jpeg" size="50"/>
                <div>
                    <Link href="/other">
                        <a>go to other page</a>
                    </Link>
                </div>
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