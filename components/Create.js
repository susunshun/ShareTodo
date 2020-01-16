import React from 'react'
import styled from 'styled-components';
import CreateForm from "./CreateForm";

class Create extends React.Component {
    render() {
        return (
            <Root>
                <CreateForm
                    url={this.props.url}
                    onSubmit={title => this.props.create(title.text)}
                />
            </Root>
        )
    }
}

Create.propTypes = {};

export const Root = styled.div`
`;

export default Create