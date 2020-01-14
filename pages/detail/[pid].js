import Link from "next/link";
import Layout from '../../containers/Layout'
import React from "react";
import { useRouter } from 'next/router'
import Detail from "../../containers/Detail";

export default () => {
    const router = useRouter();
    const {pid} = router.query;

    return (
        <Layout header="Detail" title='' deleteId={pid} back={() => router.push('/')}>
            <Detail id={pid}>a</Detail>
        </Layout>
    )
};
