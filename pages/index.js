import Link from "next/link";
import Layout from '../components/Layout';
import Image from '../components/Image';
import Counter from '../components/Counter';
import React from "react";
import styled from 'styled-components';
import Sampledata from "../components/Sampledata";


import VisibleTodoList from "../containers/VisibleTodoList"
import Filter from "../components/Filter";

export default () => (
    <Layout header="最高のヘッダー" title="最高のページ">
        <VisibleTodoList />
        <Filter/>
        <Image fileName="mokumoku.jpeg" size="50"/>
        <div>
            <Link href="/other">
                go to other page
            </Link>
        </div>
    </Layout>
);

export const TestText = styled.div`
  font-size: 20px;
`;