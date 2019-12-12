import Link from "next/link";
import Layout from '../components/Layout';
import Image from '../components/Image';
import Counter from '../components/Counter';
import React from "react";
import styled from 'styled-components';
import Sampledata from "../components/Sampledata";

export default () => (
    <Layout header="Next" title="Top Page">
        <Counter/>
        <p>Welcome to next.js</p>
        <TestText>styled component txt</TestText>
        <Image fileName="mokumoku.jpeg" size="250"/>
        <div>
            <Link href="/other">
                go to other page
            </Link>
        </div>
        <Sampledata />
    </Layout>
);

export const TestText = styled.div`
  font-size: 100px;
`;