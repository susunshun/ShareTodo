import Link from "next/link";
import Layout from '../components/Layout';
import Image from '../components/Image'
import React from "react";
import styled from 'styled-components';

export default () => (
  <Layout header="Next" title="Top Page">
    <p>Welcome to next.js</p>
    <TestText>styled component txt</TestText>
    <Image fileName="mokumoku.jpeg" size="250" />
    <div>
      <Link href="/other">
        go to other page
      </Link>
    </div>
  </Layout>
);

export const TestText = styled.div`
  font-size: 100px;
`;