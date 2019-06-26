import React from 'react'

import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import LoginPage from '../LoginPage'
import TopNavigation from '../TopNavigation'
import Todos from '../Todos'
import Todo from '../Todo'
import Module2 from '../Module2'
import Module3 from '../Module3'

import * as ROUTES from '../../constants/routes'

import {
    Menu,
    Segment,
} from 'semantic-ui-react'

import './style.scss'

class App extends React.Component {
    render() {
        if (!this.props.auth.authorized) return <LoginPage />

        return (
            <div>
                <TopNavigation />
                <div className="container5">
                    <div className="sidebar5">
                        <Menu fluid vertical pointing secondary>
                            <Menu.Item
                                as={Link}
                                name="Todo"
                                icon="tasks"
                                active={this.props.location.pathname === ROUTES.TODOS}
                                to={ROUTES.TODOS} />
                            <Menu.Item
                                as={Link}
                                name="Modul 2"
                                active={this.props.location.pathname === ROUTES.MODULE2}
                                to={ROUTES.MODULE2} />
                            <Menu.Item
                                as={Link}
                                name="Modul 3"
                                active={this.props.location.pathname === ROUTES.MODULE3}
                                to={ROUTES.MODULE3} />
                        </Menu>
                    </div>
                    <Segment className="content5">
                        <Route exact path={ROUTES.TODOS} component={Todos} />
                        <Route path={ROUTES.TODO()} component={Todo} />
                        <Route path={ROUTES.MODULE2} component={Module2} />
                        <Route path={ROUTES.MODULE3} component={Module3} />
                    </Segment>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.get('auth'),
})

export default withRouter(connect(mapStateToProps)(App))
