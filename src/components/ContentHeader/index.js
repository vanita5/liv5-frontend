import React from 'react'

import { Header, Icon } from 'semantic-ui-react'

class ContentHeader extends React.Component {
    render() {
        return (
            <Header as="h2">
                <Icon name={this.props.icon} circular />
                <Header.Content>
                    {this.props.title}
                    {this.props.subtitle &&
                        <Header.Subheader>{this.props.subtitle}</Header.Subheader>}
                </Header.Content>
            </Header>
        )
    }
}

export default ContentHeader
