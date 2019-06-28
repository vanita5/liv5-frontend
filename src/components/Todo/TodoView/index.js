import React from 'react'
import moment from 'moment'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import xssFilter from 'showdown-xss-filter'

import { Feed, Grid, Placeholder, Segment } from 'semantic-ui-react'

import 'react-mde/lib/styles/scss/react-mde-all.scss'

import './style.scss'

class TodoView extends React.Component {
    static PREVIEW = 'preview'
    static WRITE = 'write'

    constructor(props) {
        super(props)
        this.state = {
            mde: props.todo ? props.todo.description : null,
            tab: TodoView.PREVIEW,
        }
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
            extensions: [ xssFilter ],
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.todo && !prevProps.todo) {
            this.setState({ mde: this.props.todo.description })
        }
    }

    handleMdeChange(mde) {
        this.setState({ mde })
    }

    handleTabChange(tab) {
        if (tab === TodoView.WRITE && this.state.tab === TodoView.WRITE) { // Save!
            console.log('save changes...')
            // TODO save
            // TODO maybe we need to switch tab to preview after!
        } else if (tab === TodoView.PREVIEW && this.state.tab === TodoView.WRITE) { // Cancel, reset mde
            this.setState({ mde: this.props.todo.description })
        }
        this.setState({ tab })
    }

    render() {
        const { user, todo } = this.props
        return (
            <Grid divided>
                <Grid.Column width={13}>
                    <Segment basic>
                        {this.state.mde === null &&
                            <Segment placeholder loading />}
                        {this.state.mde !== null &&
                            <ReactMde
                                l18n={{
                                    write: this.state.tab === 'preview' ? 'Edit' : 'Save',
                                    preview: this.state.tab === 'write' && 'Cancel',
                                }}
                                value={this.state.mde}
                                selectedTab={this.state.tab}
                                onChange={mde => this.handleMdeChange(mde)}
                                onTabChange={tab => this.handleTabChange(tab)}
                                generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))} />}
                        {!todo &&
                            <Placeholder>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>}
                        {todo &&
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image="/logo.png" />
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>{user.name}</Feed.User> updated this task
                                            <Feed.Date>{moment(todo.updated_at).fromNow()}</Feed.Date>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Feed.Label image="/logo.png" />
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>{user.name}</Feed.User> created this task
                                            <Feed.Date>{moment(todo.created_at).fromNow()}</Feed.Date>
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
        )
    }
}

export default TodoView
