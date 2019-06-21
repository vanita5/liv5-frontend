import React from 'react'

import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginPage from '../LoginPage'
import { Button } from 'semantic-ui-react'
import { logout } from '../../action/auth'

import './style.scss'

class App extends React.Component {
    render() {
        if (!this.props.auth.authorized) return <LoginPage />
        return (
            <div>
                <h1>liv5</h1>
                <Button onClick={() => this.props.logout()}>Logout</Button>
            </div>
            /*<Router>
                <Layout>
                    <Route ... />
                </Layout>
            </Router>
            */
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.get('auth'),
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
