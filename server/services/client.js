let plaid = require('plaid');
let config = require('../../config/plaid');

// Initialize the Plaid client
let client = new plaid.Client(
    config.PLAID_CLIENT_ID,
    config.PLAID_SECRET,
    config.PLAID_PUBLIC_KEY,
    plaid.environments[config.PLAID_ENV]
);

module.exports = {client};