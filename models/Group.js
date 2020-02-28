const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  payerUsername: String,
  payeeUsernames: [String],
  payeeAmounts: [Number]
});

const groupSchema = new mongoose.Schema({
  title: String,
  description: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  ledger: [transactionSchema]
});

module.exports = mongoose.model('Group', groupSchema);
