import React, { Component } from 'react'
import { Menu, Segment, Button, Form, Grid, Header, Image, Message } from 'semantic-ui-react'
import api from '../../apis/api';
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            phone: ''
        };
    }

    handleInputChange = (event) => {
        console.log(event.target);
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.email && this.state.password && this.state.phone && this.state.name) {
            api.signup(this.state.email, this.state.password, this.state.name, this.state.phone)
                .then(res => {
                    if(res.data.message === "Success"){
                        window.location = "/transactions";
                    }else {
                        window.location = "/";
                    }
                })
                .catch(err => window.location = "/");
        }
    };


    render() {
        return (
            <div className='login-form'>

                <style>{`
                      body > div,
                      body > div > div,
                      body > div > div > div.login-form {
                        height: 100%;
                      }
                    `}
                </style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Sign Up
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    fluid
                                    icon='user'
                                    name='name'
                                    iconPosition='left'
                                    placeholder='Name'/>
                                <Form.Input
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    fluid
                                    icon='mail'
                                    name="email"
                                    iconPosition='left'
                                    placeholder='E-mail address'/>

                                <Form.Input
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    fluid
                                    icon='lock'
                                    name='password'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'/>

                                <Form.Input
                                    value={this.state.phone}
                                    onChange={this.handleInputChange}
                                    fluid
                                    icon='phone'
                                    name='phone'
                                    iconPosition='left'
                                    placeholder='Phone'/>

                                <Button
                                    disabled={!(this.state.email && this.state.name && this.state.password && this.state.phone)}
                                    color='teal' fluid size='large'
                                    onClick={this.handleSubmit}>
                                    Sign Up
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Registered ? <a href='/login'>Login</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Signup