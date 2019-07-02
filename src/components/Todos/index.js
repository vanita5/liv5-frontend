import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import {Icon, Label, List} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTodos } from '../../selector/todoSelector'

import ContentHeader from '../ContentHeader'

import { getTodosAsync } from '../../action/liv5'

import * as ROUTES from '../../constants/routes'

import './style.scss'

class Todos extends React.Component {
    componentDidMount() {
        this.props.getTodos()
    }

    render() {
        return (
            <div id="todo">
                <ContentHeader icon="tasks" title="Todos" subtitle="Manage you tasks." />
                <List divided selection relaxed>
                    {this.props.todos.map(todo => (
                        <List.Item key={todo.todo_id} as={Link} to={ROUTES.TODO(todo.todo_id)}>
                            <List.Icon name="check circle outline" size="large" verticalAlign="middle" />
                            <List.Content>
                                <List.Header as="p" className="todo-header">{todo.title}</List.Header>
                                <List.Description>
                                    Updated {moment(todo.updated_at).fromNow()}
                                    {todo.labels.map(label => (
                                        <Label color={label.color} key={label.label_id} horizontal>
                                            <Icon name={label.icon} />
                                            {label.name}
                                        </Label>
                                    ))}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: getTodos(state),
})

const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(getTodosAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
