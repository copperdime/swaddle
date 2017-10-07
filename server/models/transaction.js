const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    transactionId: { type: String, required: true },
    accountId: { type: String, required: true },
    pending: {type: Boolean, default: true},
    date: { type: Date, required: true },
    address: { type: String, required: false },
    city : { type: String, required: false },
    notes: { type: Object, required: false }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

