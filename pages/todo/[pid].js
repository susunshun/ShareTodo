import Layout from '../../containers/Layout'
import React from "react";
import {useRouter} from 'next/router'
import EventTitle from "../../containers/EventTitle";
import TodoList from "../../containers/TodoList"
import AddTodo from "../../containers/AddTodo"
import Filter from "../../components/Filter";
import styled from "styled-components";
import { resetServerContext } from 'react-beautiful-dnd';

export default () => {
    const router = useRouter();
    const {pid} = router.query;
    resetServerContext();

    return (
        <Layout title="ShareTodo" backgroundImage="background2.jpeg" iconColor="white">
            <Content>
                <EventTitle pid={pid} />
                <AddTodo pid={pid} />
                <TodoList pid={pid} />
                <Filter/>
            </Content>
        </Layout>
    )
};

export const Content = styled.div`
    min-height: 100vh;
`;

export const TestText = styled.div`
    font-size: 20px;
`;
