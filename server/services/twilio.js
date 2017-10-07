// import Login from "./pages/login";


// Twilio Credentials
var accountSid = 'AC10cff2235f9519d74abebadfcb82b774';
var authToken = 'fe6d15c466b538cc605bf3c9138e8430';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

let text = () => {
    client.messages.create({
        to: "+14086749339",
        from: "+16505626488",
        body: "Hello from Swaddle!",
    }, function (err, message) {
        console.log(message.sid);
    });
};
text();

// let business = () =>{
//     db.swaddle.
//
// }