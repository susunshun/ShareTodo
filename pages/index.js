import Link from "next/link";
import Layout from '../components/Layout';
import Image from '../components/Image';
import React from "react";
import styled from 'styled-components';
import VisibleTodoList from "../containers/VisibleTodoList"
import AddTodo from "../containers/AddTodo"
import Filter from "../components/Filter";

export default () => (
    <Layout header="最高のヘッダー" title="最高のページ">
        <AddTodo/>
        <VisibleTodoList/>
        <Filter/>
        <Image fileName="mokumoku.jpeg" size="50"/>
        <div>
            <Link href="/other">
                <a>go to other page</a>
            </Link>
        </div>
    </Layout>
);

export const TestText = styled.div`
  font-size: 20px;
`;