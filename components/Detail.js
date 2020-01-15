import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import DetailForm from "./DetailForm";

class Detail extends React.Component {
    componentDidMount() {
        this.props.fetchDetail(this.props.id);
    }

    submit = v => {
        console.log(v)
    };

    render() {
        return (
            <Root>
                <DetailForm onSubmit={this.submit}
                            initialValues={{text: this.props.todo.text, memo: this.props.todo.memo}}/>
            </Root>
        )
    }
}

Detail.propTypes = {
    id: PropTypes.string.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};

export const Root = styled.div`
  padding: 20px;
`;

export default Detail