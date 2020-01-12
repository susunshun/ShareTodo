import Link from "next/link";
import Layout from '../containers/Layout'
import React from "react";

const Others = () => {
    return (
        <Layout header="Other" title="Other Page">
            <p>this is other page</p>
            <hr/>
            <Link href="/">
                <button>back to main page</button>
            </Link>
        </Layout>
    )
};
export default Others;