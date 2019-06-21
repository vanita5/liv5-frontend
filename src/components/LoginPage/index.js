import React from 'react'

import { connect } from 'react-redux'
import { getTokenAsync } from '../../action/auth'
import {
    Button,
    Form,
    Grid,
    Image,
    Segment,
} from 'semantic-ui-react'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Email"
                                name="username"
                                type="email"
                                onChange={event => this.handleInputChange(event)}
                                value={this.state.username} />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                name="password"
                                type="Password"
                                onChange={event => this.handleInputChange(event)}
                                value={this.state.password} />
                            <Button.Group fluid>
                                <Button
                                    positive
                                    loading={this.props.auth.loading}
                                    disabled={false}
                                    onClick={() => this.props.login(this.state.username, this.state.password)}>
                                    Login
                                </Button>
                                <Button.Or />
                                <Button>Sign Up</Button>
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
    login: (username, password) => dispatch(getTokenAsync(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
