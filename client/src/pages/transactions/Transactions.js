import React, { Component } from 'react'
import _ from 'lodash'
import api from '../../apis/api';
import {Menu, Container, Grid,  Segment, Icon, Image, Comment, Form, Button, Divider, Modal, Header} from 'semantic-ui-react';
import { Link } from "react-router-dom";
let moment = require('moment');
let numeral = require('numeral');



class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {

            transactions : []

        };
    }

    componentDidMount() {
        this.loadTransactions();
    }

    loadTransactions = () => {
        api.items()
            .then(res =>
                this.setState({ transactions: res.data.results})
            )
            .catch(err => console.log(err));
    };

    render() {

        return (

                <Container style={{ padding: '0em 0em'}}>
                    <Menu>
                        <Menu.Menu position='right'>

                            <Menu.Item as={Link} to='/'><Icon name="home"/>Home</Menu.Item>
                            <Menu.Item as={Link} to='/login'><Icon name="sign in"/>Login</Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    <Grid celled='internally'>
                        {this.state.transactions.map(transaction => (
                            <Grid.Row key={transaction._id}>
                                <Grid.Column width={4}>
                                    <Segment.Group>
                                        <Segment vertical textAlign="center" size="massive"> <Icon name='dollar' />{numeral(transaction.amount).format('0.00')}</Segment>
                                        <Segment vertical textAlign="center" > <Icon name='calendar' />{moment(transaction.date).format('LL')}</Segment>
                                    </Segment.Group>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Segment.Group>
                                        <Segment textAlign="left" vertical><Icon name="payment" color="green" size="large"/><span style={{"fontSize":"14px"}}>{transaction.name}</span></Segment>

                                        <Segment textAlign="left" vertical>
                                            <Segment.Group horizontal>
                                                <Segment><Icon name="phone square" color="red" size="large"/><span style={{"fontSize":"14px"}}>1.800.432.1000</span></Segment>
                                                <Segment><Icon name="warning sign" color="red" size="large"/><span style={{"fontSize":"14px"}}><a href="https://www.bankofamerica.com/privacy/resolve-identity-theft.go">Bank of America </a></span></Segment>
                                            </Segment.Group>
                                        </Segment>
                                    </Segment.Group>

                                </Grid.Column>
                            </Grid.Row>
                        ))}


                    </Grid>
                </Container>

        )
    }
}

export default Transactions