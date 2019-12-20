import Link from "next/link";
import Layout from '../../components/Layout'
import React from "react";
import { useRouter } from 'next/router'

const Detail = () => {
    const router = useRouter();
    const {pid} = router.query;
    console.log(pid);

    return (
        <Layout header="Detail" title="Detail Page">
            <p>this is details page</p>
            <hr/>
            {pid}
            <Link href="/">
                <button>back to main page</button>
            </Link>
        </Layout>
    )
};
export default Detail;