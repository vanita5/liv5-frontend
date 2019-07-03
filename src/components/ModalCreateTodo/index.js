import React from 'react'
import ReactMde from 'react-mde'
import { connect } from 'react-redux'
import * as Showdown from 'showdown'

import {
    Modal,
    Button,
    Form,
    Input,
    Icon,
    Dropdown,
    Label,
} from 'semantic-ui-react'

import { getLabelsMappedToOptions } from '../../selector/labelSelector'
import { getLabelsAsync } from '../../action/liv5'

import './style.scss'

class ModalCreateTodo extends React.Component {
    static PREVIEW = 'preview'
    static WRITE = 'write'

    static DEFAULT_STATE = {
        title: '',
        mde: '',
        labels: [],
        tab: ModalCreateTodo.WRITE,
    }

    constructor(props) {
        super(props)
        this.state = ModalCreateTodo.DEFAULT_STATE
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        })
    }

    componentDidMount() {
        this.props.getLabels()
    }

    handleMdeChange(mde) {
        this.setState({ mde })
    }

    handleTabChange(tab) {
        this.setState({ tab })
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClose() {
        this.setState(ModalCreateTodo.DEFAULT_STATE)
        this.props.onCloseHandler()
    }

    handleLabelsChange(labels) {
        this.setState({ labels })
    }

    renderLabel(label) {
        return (
            <Label color={label.label.color} key={label.key} horizontal>
                <Icon name={label.label.icon} />
                {label.text}
            </Label>
        )
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                centered={false}
                closeOnEscape={false}
                className="todo modal"
                onClose={() => this.handleClose()}>
                <Modal.Header><Icon name='check circle outline' /> Create a Task</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <label>Title</label>
                            <Input
                                type='text'
                                name='title'
                                value={this.state.title}
                                placeholder='Got a task?'
                                onChange={e => this.handleInputChange(e)} />
                        </Form.Field>
                        <Form.Field>
                            <ReactMde
                                value={this.state.mde}
                                selectedTab={this.state.tab}
                                onChange={mde => this.handleMdeChange(mde)}
                                onTabChange={tab => this.handleTabChange(tab)}
                                generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))} />
                        </Form.Field>
                        <Form.Field>
                            <label>Labels</label>
                            {this.props.labels.length > 0 &&
                            <Dropdown
                                fluid
                                clearable
                                search
                                selection
                                multiple
                                placeholder='Add some labels...'
                                options={this.props.labels}
                                onChange={(_, options) => this.handleLabelsChange(options.value)}
                                renderLabel={label => this.renderLabel(label)}/>}
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.handleClose()}>Cancel</Button>
                    <Button positive icon='save' content='Create' />
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    labels: getLabelsMappedToOptions(state),
})

const mapDispatchToProps = dispatch => ({
    getLabels: () => dispatch(getLabelsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateTodo)
