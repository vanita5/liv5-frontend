import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../action/auth'
import {
    Menu,
    Container,
    Image,
    Button,
    Dropdown,
} from 'semantic-ui-react'
import { getUser } from '../../selector/authSelector'

class TopNavigation extends React.Component {
    render() {
        return (
            <Menu fixed="top">
                <Container fluid>
                    <Menu.Item header style={{ width: 250 }}>
                        <Image size="mini" src="/logo.png" style={{ marginRight: '1.75em' }} />
                        Dashboard
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu borderless secondary>
                            <Menu.Item>
                                <Button circular icon="bell outline" />
                            </Menu.Item>
                            <Dropdown item icon={null} text={
                                <span>
                                    <Image avatar src="/logo.png" />
                                    {this.props.user ? this.props.user.name : 'Username'}
                                </span>
                            }>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon="log out" text="Logout" onClick={() => this.props.logout()}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

const mapStateToProps = state => ({
    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation)