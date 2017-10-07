import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react'

import { Link } from "react-router-dom";


class Home extends Component {

    render() {

        return (
            <div>
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: 1000, padding: '1em 0em' }}
                    vertical>

                    <Container>
                        <Menu inverted pointing secondary size='large'>
                            <Menu.Item position='right'>
                                <Button as={Link} to='/login' inverted >Log in</Button>
                            </Menu.Item>
                        </Menu>
                    </Container>

                    <Container text>
                        <Header
                            as='h1'
                            content='Swaddle'
                            inverted
                            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
                        />
                        <Header
                            as='h2'
                            content='Guard Your Money '
                            inverted
                            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                        />
                        <Button primary size='huge' as={Link} to='/signup'>
                            Get Started
                            <Icon name='right arrow' />
                        </Button>
                    </Container>
                </Segment>

            </div>
        )
    }
}

export default Home;