import React from 'react'
import moment from 'moment'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import xssFilter from 'showdown-xss-filter'
import { getEventText } from '../../../utils'
import {
    Feed,
    Grid,
    Placeholder,
    Segment,
    Divider,
    Icon,
    Label,
    Message,
} from 'semantic-ui-react'

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

    getWriteButton() {
        const isPreview = this.state.tab === 'preview'
        return (
            <span>
                <Icon name={isPreview ? 'edit' : 'save'} />
                {isPreview ? 'Edit' : 'Save'}
            </span>
        )
    }

    getPreviewButton() {
        return this.state.tab !== 'preview' && (
            <span>
                <Icon name='cancel' />
                Cancel
            </span>
        )
    }

    render() {
        const { user, todo } = this.props
        if (todo && todo.error) return (
            <Message
                negative
                icon='warning sign'
                header={`Sorry, we couldn't load Todo #${this.props.todoId}`}
                content='Are you sure this todo even exists? /o\'
                style={{ maxWidth: 350, margin: '150px auto' }}/>
        )
        return (
            <Grid divided>
                <Grid.Column width={13}>
                    <Segment basic>
                        {this.state.mde === null &&
                            <Segment placeholder loading />}
                        {this.state.mde !== null &&
                            <ReactMde
                                l18n={{
                                    write: this.getWriteButton(),
                                    preview: this.getPreviewButton(),
                                }}
                                value={this.state.mde}
                                selectedTab={this.state.tab}
                                className={this.state.tab}
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
                                {todo.events.map(event => (
                                    <Feed.Event key={event.event_id}>
                                        <Feed.Label image="/logo.png" />
                                        <Feed.Content>
                                            <Feed.Summary>
                                                <Feed.User>{user.name}</Feed.User> {getEventText(event.type)}
                                                <Feed.Date>{moment(event.created_at).fromNow()}</Feed.Date>
                                            </Feed.Summary>
                                            {event.comment && <Feed.Extra text>{event.comment}</Feed.Extra>}
                                        </Feed.Content>
                                    </Feed.Event>
                                ))}
                            </Feed>}
                    </Segment>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Segment>
                        <h5>Label</h5>
                        <div className="labels">
                            {todo && todo.labels.map(label => (
                                <Label color={label.color} key={label.label_id}>
                                    <Icon name={label.icon} />
                                    {label.name}
                                </Label>
                            ))}
                            {!todo && <Placeholder><Placeholder.Line length='short'/></Placeholder>}
                        </div>
                        <Divider />
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default TodoView
