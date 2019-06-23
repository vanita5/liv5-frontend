import React from 'react'

import { connect } from 'react-redux'
import { getTokenAsync, registerAsync } from '../../action/auth'
import {
    Button,
    Form,
    Grid,
    Image,
    Segment,
    Icon,
} from 'semantic-ui-react'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            signup: false,
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSignUpClick() {
        if (this.state.signup) {
            this.props.signup(
                this.state.name,
                this.state.email,
                this.state.password,
                this.state.password_confirmation
            )
        } else {
            this.setState({ signup: true })
        }
    }

    handleLoginClick() {
        if (!this.state.signup) {
            this.props.login(this.state.email, this.state.password)
        } else {
            this.setState({ signup: false })
        }
    }

    render() {
        return (
            <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment raised>
                        <Image
                            src="/logo.png"
                            alt="Logo (liv5)"
                            width={150}
                            style={{ margin: '0 auto 25px' }} />
                        <Form size="large">
                            {this.state.signup &&
                                <Form.Input
                                fluid
                                icon="user outline"
                                iconPosition="left"
                                placeholder="Name"
                                name="name"
                                type="text"
                                onChange={event => this.handleInputChange(event)}
                                value={this.state.name}/>}
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Email"
                                name="email"
                                type="email"
                                onChange={event => this.handleInputChange(event)}
                                value={this.state.email} />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                name="password"
                                type="Password"
                                onChange={event => this.handleInputChange(event)}
                                value={this.state.password} />
                            {this.state.signup &&
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Confirm Password"
                                    name="password_confirmation"
                                    type="password"
                                    onChange={event => this.handleInputChange(event)}
                                    value={this.state.password_confirmation} />}
                            <Button.Group fluid>
                                <Button
                                    positive={!this.state.signup}
                                    loading={this.props.auth.loading}
                                    disabled={false}
                                    onClick={() => this.handleLoginClick()}>
                                    {this.state.signup && <Icon name="long arrow alternate left" />}
                                    {this.state.signup ? 'Back' : 'Login'}
                                </Button>
                                <Button.Or />
                                <Button
                                    positive={this.state.signup}
                                    onClick={() => this.handleSignUpClick()}>
                                    Sign Up
                                </Button>
                            </Button.Group>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.get('auth'),
})

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(getTokenAsync(email, password)),
    signup: (name, email, password, password_confirmation) => dispatch(registerAsync(name, email, password, password_confirmation))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
