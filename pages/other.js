import Link from "next/link";
import Layout from '../components/Layout'
import React from "react";
import Counter from "../components/Counter";

export default () => (
  <Layout header="Other" title="Other Page">
      <p>this is other page</p>
      <hr />
      <Counter />
      <Link href="/">
          <button>back to main page</button>
      </Link>
  </Layout>
);