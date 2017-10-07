let config = require('../../config/twilio');
let twilio = require('twilio');
let twilioClient = new twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);

// var accountSid = 'AC10cff2235f9519d74abebadfcb82b774';
// var authToken = 'fe6d15c466b538cc605bf3c9138e8430';
//
// //require the Twilio module and create a REST client
// var client = require('twilio')(accountSid, authToken);
//
// let text = () => {
//     client.messages.create({
//         to: "+14086749339",
//         from: "+16505626488",
//         body: "Hello from Swaddle!",
//     }, function (err, message) {
//         console.log(message.sid);
//     });
// };


let sendMessage = async (body, to) => {
    try{


        await twilioClient.messages.create({
            to: to,
            body: body,
            from: config.PHONE_NUMBER// From a valid Twilio number
        });

        //console.log(result);

    }catch (err){
        return ({errorMsg: err.message});
    }

};


let createMessageBody = async (transaction) => {
    try{

        return utils.convert.toString(transaction.amount, transaction.name, transaction.address, transaction.city);

    }catch (err){
        return ({errorMsg: err.message});
    }

};





module.exports = {sendMessage, createMessageBody};