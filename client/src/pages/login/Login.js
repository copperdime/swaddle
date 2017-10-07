import React, { Component } from 'react'
import { Menu, Segment, Button, Form, Grid, Header, Image, Message } from 'semantic-ui-react'
import api from '../../apis/api';
import { Link } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: ''
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
        if (this.state.email && this.state.password) {
            api.login(this.state.email, this.state.password)
            .then(res => {

                if(res.data.message === "Success"){
                    window.location = "/transactions";
                }else {
                    window.location = "/";
                }
            })
            .catch(err =>  window.location = "/");
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
                            {' '}Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    fluid
                                    icon='user'
                                    name='email'
                                    iconPosition='left'
                                    placeholder='Email'
                                />
                                <Form.Input
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    placeholder='Password'
                                    type='password'/>

                                <Button
                                    disabled={!(this.state.email && this.state.password)}
                                    color='blue' fluid size='large'
                                    onClick={this.handleSubmit}>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a href='/signup'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login;
