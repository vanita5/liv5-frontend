import React from 'react'
import { connect } from 'react-redux'

import { Placeholder } from 'semantic-ui-react'
import TodoView from './TodoView'
import ContentHeader from '../ContentHeader'
import { getTodo } from '../../selector/todoSelector'
import { getUser } from '../../selector/authSelector'

import { getTodoByIdAsync } from '../../action/liv5'
import './style.scss'

class Todo extends React.Component {
    componentDidMount() {
        this.props.getTodo(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <ContentHeader
                    icon="check"
                    title={
                        <div>
                            Todo <span className="tag">#{this.props.match.params.id}</span>
                        </div>
                    }
                    subtitle={this.props.todo ? this.props.todo.title : <Placeholder><Placeholder.Line /></Placeholder>} />
                <TodoView todo={this.props.todo} user={this.props.user} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todo: getTodo(state),
    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    getTodo: id => dispatch(getTodoByIdAsync(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
