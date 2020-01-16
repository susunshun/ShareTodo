import React from 'react'
import styled from 'styled-components';
import CreateForm from "./CreateForm";
import Link from "next/link";
import Button from '@material-ui/core/Button';

class Create extends React.Component {
    linkTodo = (url) => {
        return (
            <div>
                done<br/>
                <Link href={'/todo/' + url}>
                    <Button variant="contained" color="primary">
                        go
                    </Button>
                </Link>
            </div>
        )
    };

    render() {
        return (
            <Root>
                {this.props.url ?
                    this.linkTodo(this.props.url) :
                    <CreateForm
                        onSubmit={title => this.props.create(title.text)}
                    />}
            </Root>
        )
    }
}

Create.propTypes = {};

export const Root = styled.div`
`;

export default Create