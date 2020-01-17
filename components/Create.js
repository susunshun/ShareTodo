import React from 'react'
import styled from 'styled-components';
import CreateForm from "./CreateForm";
import {Content} from "../pages";

class Create extends React.Component {
    render() {
        return (
            <Root>
                <Description>
                    <TitleSpan>
                        Let's start
                    </TitleSpan>
                    <DetailSpan>
                        共有できるTODOリストを作成してみましょう
                    </DetailSpan>
                </Description>
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
    height: 100vh;
`;

export const TitleSpan = styled.span`
    font-size: 30px;
`;

export const DetailSpan = styled.span`
    font-size: 13px;
`;

export const Description = styled.div`
    width:100%;
    color: white;
    position: fixed;
    display:flex;
    flex-direction:column;
`;

export default Create