import React from 'react'
import { connect } from 'react-redux'

import { getTodoByIdAsync } from '../../action/liv5'

class Todo extends React.Component {
    componentDidMount() {
        this.props.getTodo(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <h1>Todo #{this.props.match.params.id}</h1>
                <p>{JSON.stringify(this.props.todo)}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todo: state.liv5.get('todo'),
})

const mapDispatchToProps = dispatch => ({
    getTodo: id => dispatch(getTodoByIdAsync(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
