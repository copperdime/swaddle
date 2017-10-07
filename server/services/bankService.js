let axios = require('axios');
let config = require('../../config/plaid');
//let client = require('./client');
let moment = require('moment');

let plaid = require('plaid');

let PLAID_CLIENT_ID = "59cbf7a9bdc6a40ac87ed8bb";
let PLAID_SECRET = "31d69576685933df6ef151e7806b56";
let PLAID_PUBLIC_KEY = "be508262813de7f2a74af25ff88055";
let PLAID_ENV ='development';

let getTransactions = async function(noOfDays){
    try{

        let client = new plaid.Client(
            PLAID_CLIENT_ID,
            PLAID_SECRET,
            PLAID_PUBLIC_KEY,
            plaid.environments[PLAID_ENV]
        );
        let startDate = moment().subtract(noOfDays, 'days').format('YYYY-MM-DD');
        let endDate = moment().format('YYYY-MM-DD');
        return await client.getTransactions(config.ACCESS_TOKEN, startDate, endDate, {
            count: 250,
            offset: 0,
        });


    }catch (err){
        console.log(err);
        return ({errorMsg: err.message});
    }

};


let getAccounts = async function(){
    try{

        let results =  await client.getAuth(config.ACCESS_TOKEN);
        return results.accounts;

    }catch (err){
        return ({errorMsg: err.message});
    }

};



module.exports = {getTransactions, getAccounts};