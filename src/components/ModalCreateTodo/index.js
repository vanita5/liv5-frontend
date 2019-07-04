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
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'
import enUS from 'rc-calendar/lib/locale/en_US'

import { getLabelsMappedToOptions } from '../../selector/labelSelector'
import { getLabelsAsync, postCreateTodoAsync } from '../../action/liv5'

import 'rc-calendar/assets/index.css'
import './style.scss'

class ModalCreateTodo extends React.Component {
    static PREVIEW = 'preview'
    static WRITE = 'write'
    static FORMAT = 'YYYY-MM-DD'

    static DEFAULT_STATE = {
        title: '',
        mde: '',
        labels: [],
        due_date: null,
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

    handleSave() {
        this.props.createTodo(
            this.state.title,
            this.state.mde,
            this.state.labels,
            this.state.due_date,
        )
        this.handleClose()
    }

    handleLabelsChange(labels) {
        this.setState({ labels })
    }

    handleDatePickerChange(date) {
        this.setState({ due_date: date ? date.format(ModalCreateTodo.FORMAT) : null })
    }

    renderLabel(label, defaultProps) {
        return (
            <Label color={label.label.color} key={label.key} horizontal>
                <Icon name={label.label.icon} />
                {label.text}
                <Icon name='delete' onClick={e => defaultProps.onRemove(e, label)} />
            </Label>
        )
    }

    renderCalendar() {
        return (
            <Calendar
                locale={enUS}
                format={ModalCreateTodo.FORMAT}
                showDateInput={true}
                focusablePanel={false} />
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
                        <Form.Group widths='equal' className='group'>
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
                                <label>Due Date</label>
                                <DatePicker
                                    animation='slide-up'
                                    onChange={date => this.handleDatePickerChange(date)}
                                    calendar={this.renderCalendar()}>
                                    {
                                        ({ value }) => (
                                            <Input
                                                value={(value && value.format(ModalCreateTodo.FORMAT)) || ''}
                                                placeholder='1994-08-01' />
                                        )
                                    }
                                </DatePicker>
                            </Form.Field>
                        </Form.Group>
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
                                    renderLabel={(label, i, defaultProps) => this.renderLabel(label, defaultProps)}/>}
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.handleClose()}>Cancel</Button>
                    <Button positive icon='save' content='Create' onClick={() => this.handleSave()} />
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
    createTodo: (title, description, labels, due_date) => dispatch(postCreateTodoAsync(title, description, labels, due_date))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateTodo)
