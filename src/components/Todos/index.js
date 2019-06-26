import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { List, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { getTodosAsync } from '../../action/liv5'

import * as ROUTES from '../../constants/routes'

class Todos extends React.Component {
    componentDidMount() {
        this.props.getTodos()
    }

    render() {
        return (
            <div id="todo">
                <h1>Todos</h1>
                <List divided selection relaxed>
                    {this.props.todos.map(todo => (
                        <List.Item key={todo.todo_id} as={Link} to={ROUTES.TODO(todo.todo_id)}>
                            <List.Icon name="check circle outline" size="large" verticalAlign="middle" />
                            <List.Content>
                                <List.Header as="a">{todo.title}</List.Header>
                                <List.Description as="a">Updated {moment(todo.updated_at).fromNow()}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.liv5.get('todos'),
})

const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(getTodosAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
