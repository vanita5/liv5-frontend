import React from 'react'

import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginPage from '../LoginPage'
import TopNavigation from '../TopNavigation'

import './style.scss'

class App extends React.Component {
    render() {
        if (!this.props.auth.authorized) return <LoginPage />
        return (
            <div>
                <TopNavigation />
                <Router>

                </Router>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.get('auth'),
})

export default connect(mapStateToProps)(App)
