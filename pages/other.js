import Link from "next/link";
import Layout from '../components/Layout'
import React from "react";

export default () => (
  <Layout header="Other" title="Other Page">
      <p>this is other page</p>
      <hr />
      <Link href="/">
          <button>back to main page</button>
      </Link>
  </Layout>
);