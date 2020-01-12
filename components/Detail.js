import React from 'react'
import PropTypes from 'prop-types'

class Detail extends React.Component {
    componentDidMount() {
        this.props.fetchDetail(this.props.id);
    }

    render() {
        return (
            <div>
                id: {this.props.todo.id}
                <br/>
                text: {this.props.todo.text}
                <br/>
                memo: {this.props.todo.memo}
            </div>
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

export default Detail