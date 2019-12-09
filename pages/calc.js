import Link from 'next/link';
import Layout from '../components/Layout';
import Calc from '../components/Calc';
import React from "react";

export default () => (
  <Layout header="Calc" title="calculator" >
    <Calc />
    <hr />
    <div>
      <Link href="/">
        <button>Back to top</button>
      </Link>
    </div>
  </Layout>
);