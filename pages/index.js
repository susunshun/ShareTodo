import Link from "next/link";
import Layout from '../components/Layout';
import Image from '../components/Image';
import Counter from '../components/Counter';
import React from "react";
import styled from 'styled-components';
import Sampledata from "../components/Sampledata";
import AddForm from "../components/AddForm";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList"
import Filter from "../components/Filter";

export default () => (
    <Layout header="最高のヘッダー" title="最高のページ">
        <TestText>styled component txt</TestText>
        <AddTodo />
        <VisibleTodoList />
        <Filter/>
        <Image fileName="mokumoku.jpeg" size="50"/>
        <div>
            <Link href="/other">
                go to other page
            </Link>
        </div>
        {/*<AddForm />*/}
        {/*<Sampledata />*/}
    </Layout>
);

export const TestText = styled.div`
  font-size: 20px;
`;