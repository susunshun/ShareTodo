import React from 'react'
import PropTypes from 'prop-types'

class Detail extends React.Component {
    componentDidMount() {
        this.props.fetchDetail(this.props.id);
    }

    render() {
        return (
            <div>
                {this.props.todo.id}
                {this.props.todo.text}
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