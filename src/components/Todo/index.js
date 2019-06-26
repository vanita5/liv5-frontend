import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { Grid, Segment, Feed, Placeholder } from 'semantic-ui-react'
import ContentHeader from '../ContentHeader'

import { getTodoByIdAsync } from '../../action/liv5'

import './style.scss'

class Todo extends React.Component {
    componentDidMount() {
        this.props.getTodo(this.props.match.params.id)
    }

    render() {
        console.log(this.props.todo)
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
                <Grid divided>
                    <Grid.Column width={13}>
                        <Segment basic>
                            <Segment placeholder loading={!this.props.todo}>
                                {this.props.todo && this.props.todo.description}
                            </Segment>
                            {!this.props.todo &&
                                <Placeholder>
                                    <Placeholder.Header image>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                </Placeholder>}
                            {this.props.todo &&
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label image="/logo.png" />
                                        <Feed.Content>
                                            <Feed.Summary>
                                                <Feed.User>{this.props.user.name}</Feed.User> updated this task
                                                <Feed.Date>{moment(this.props.todo ? this.props.todo.updated_at : null).fromNow()}</Feed.Date>
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                    <Feed.Event>
                                        <Feed.Label image="/logo.png" />
                                        <Feed.Content>
                                            <Feed.Summary>
                                                <Feed.User>{this.props.user.name}</Feed.User> created this task
                                                <Feed.Date>{moment(this.props.todo ? this.props.todo.created_at : null).fromNow()}</Feed.Date>
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Segment>

                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todo: state.liv5.get('todo'),
    user: state.auth.get('user'),
})

const mapDispatchToProps = dispatch => ({
    getTodo: id => dispatch(getTodoByIdAsync(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
