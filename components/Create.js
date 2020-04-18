import React from 'react'
import styled from 'styled-components';
import CreateForm from "./CreateForm";

class Create extends React.Component {
  render() {
    return (
      <Root>
        <Description>
          <TitleSpan>
            TODO作ってすぐ共有。
          </TitleSpan>
          <DetailSpan>
            ShareTodoはTODOリストを作成してすぐ共有できます。
            買い物メモ、タスクリスト、etc...まずは気軽に作成してみましょう。
          </DetailSpan>
        </Description>
        <CreateForm
          url={this.props.url}
          onSubmit={title => this.props.create(title.text)}
          isLoading={this.props.isLoading}
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
    width: 80%;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 25px;
`;

export const DetailSpan = styled.span`
    width: 80%;
    margin-bottom: 30px;
    font-size: 15px;
`;

export const Description = styled.div`
    width:100%;
    // color: white;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: start;
`;

export default Create