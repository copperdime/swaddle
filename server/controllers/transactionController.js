const Transaction = require("../models/transaction");
const utils = require("../utils/jsonToString");
const bankService = require("../services/bankService");
const messageService = require("../services/messageService");
let config = require('../../config/twilio');
let moment = require('moment');
let numeral = require('numeral');


let findAll = async () => {
    try{
        return await Transaction
            .find().sort({date: -1 })
    }catch(err){
        return ({errorMsg: err.message})
    }

};

let findByTransaction = async (transactionId) => {
    try{
        return await Transaction
            .find({transactionId : transactionId});
    }catch(err){
        return ({errorMsg: err.message})
    }
};


let insertTransaction = async(transaction) => {

    try{

        return await Transaction
            .create(
                {
                    amount: transaction.amount,
                    name: transaction.name,
                    transactionId: transaction.transaction_id,
                    accountId: transaction.account_id,
                    pending: transaction.pending,
                    date: transaction.date,
                    city: transaction.location.city,
                    address: transaction.location.address,
                    notes: null
                }
            );

    }catch(err){
        return ({errorMsg: err.message})
    }
};

let updateTransaction = async(transaction) => {

    try{

        let result = await findByTransaction(transaction.transaction_id);

        if(!result){
            return await Transaction
                .create(
                    {
                        transactionId: transaction.transaction_id,
                        amount: transaction.amount,
                        name: transaction.name,
                        pending: transaction.pending,
                        date: transaction.date,
                        address: utils.convert.jsonToString(transaction.location),
                        notes: null
                    }
                );
        }


    }catch(err){
        return ({errorMsg: err.message})
    }
};

let insertTransactionList = async(transactionList) => {

    try{
       for(let i = 0; i < transactionList.length; i++){

           let transaction = transactionList[i];
           console.log(transaction.transaction_id);
           let result = await findByTransaction(transaction.transaction_id);
           if(result.length === 0) {
               let insertResult = await insertTransaction(transaction);
               console.log(insertResult);
           }
       }
    }catch(err){
        return ({errorMsg: err.message})
    }
};


let fetchAndInsert = async(noOfDays) => {

    try{
        let response = await bankService.getTransactions(noOfDays);
        return await insertTransactionList(response.transactions);
    }catch (err){
        return ({errorMsg: err.message});
    }
};


let fetchLastTransaction = async() => {

    try{
        let response = await bankService.getTransactions(1);

        for(let i = 0; i < 1; i++){
            try{
                let transaction = response.transactions[i];
                //console.log(transaction);
                let messageBody = "Amount: "+numeral(transaction.amount).format('0.00') + "\n"
                    + "Date: " + moment(transaction.date).format('LL') + "\n"
                    + "Name: " + transaction.name;

                let sendMessageResult = await messageService.sendMessage(messageBody, config.TO);
                //console.log(sendMessageResult);
                //
                let result = await findByTransaction(transaction.transaction_id);
                if(result.length === 0) {

                    // let messageBody = "Amount: "+numeral(transaction.amount).format('0.00') + "\n"
                    //     + "Date: " + moment(transaction.date).format('LL') + "\n"
                    //     + "Name: " + transaction.name;
                    //
                    // let sendMessageResult = await messageService.sendMessage(messageBody, config.TO);
                    // console.log(sendMessageResult);
                    //
                    try{
                        console.log("inserting result");
                        let insertResult = await insertTransaction(transaction);
                        console.log(insertResult);
                    }catch (err){
                        console.error(err);
                    }

                }
            }catch (err){
                console.error(err);
            }


        }
    }catch(err){
        return ({errorMsg: err.message})
    }

}


module.exports = {fetchAndInsert, findAll, fetchLastTransaction};