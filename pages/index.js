import Link from "next/link";
import Layout from '../components/Layout';
import Image from '../components/Image';
import Counter from '../components/Counter';
import React from "react";
import styled from 'styled-components';
import Sampledata from "../components/Sampledata";
import AddForm from "../components/AddForm";

export default () => (
    <Layout header="Next" title="Top Page">
        <Counter/>
        <TestText>styled component txt</TestText>
        <Image fileName="mokumoku.jpeg" size="50"/>
        <div>
            <Link href="/other">
                go to other page
            </Link>
        </div>
        <AddForm />
        <Sampledata />
    </Layout>
);

export const TestText = styled.div`
  font-size: 20px;
`;