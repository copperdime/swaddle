import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TopMenu extends Component {

    render() {

        return (
            <div>
                <Menu>

                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to='/home'>Home</Menu.Item>
                        <Menu.Item as={Link} to='/login'>Login</Menu.Item>
                        <Menu.Item as={Link} to='/login'>Signup</Menu.Item>
                    </Menu.Menu>
                </Menu>

            </div>
        )
    }
}

module.exports = {TopMenu};