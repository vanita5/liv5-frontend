import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Icon,
    Label,
    List,
    Message,
    Dimmer,
    Loader,
    Menu,
    Input,
} from 'semantic-ui-react'
import { getTodosFilteredByQuery, getTodoQuery } from '../../selector/todoSelector'

import ContentHeader from '../ContentHeader'

import { getTodosAsync, setTodoQuery } from '../../action/liv5'

import * as ROUTES from '../../constants/routes'

import './style.scss'

class Todos extends React.Component {
    componentDidMount() {
        this.props.getTodos()
    }

    handleSearchChange(event) {
        this.props.setTodoQuery(event.target.value)
    }

    isLoading() {
        return this.props.todos &&
            this.props.todos.length === 0 &&
            (!this.props.query || this.props.query.length === 0)
    }

    render() {
        return (
            <div id="todo">
                <ContentHeader icon="tasks" title="Todos" subtitle="Manage you tasks." />
                <Menu attached='top'>
                    <Menu.Item as='a' icon='add' />
                    <Menu.Item position='right'>
                        <Input
                            className='icon'
                            icon='search'
                            placeholder='Search...'
                            onChange={e => this.handleSearchChange(e)} />
                    </Menu.Item>
                </Menu>
                <Dimmer active={this.isLoading()} inverted>
                    <Loader size='medium'>Loading</Loader>
                </Dimmer>
                <List divided selection relaxed>
                    {this.props.todos && this.props.todos.map(todo => (
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
                {!this.props.todos &&
                    <Message
                        negative
                        icon='warning sign'
                        header="Sorry, we couldn't load your Todos"
                        content='Try again later!'
                        style={{ maxWidth: 350, margin: '150px auto' }}/>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: getTodosFilteredByQuery(state),
    query: getTodoQuery(state),
})

const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(getTodosAsync()),
    setTodoQuery: q => dispatch(setTodoQuery(q)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
