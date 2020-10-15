const mongoose = require('mongoose');

const lbamountSchema = new mongoose.Schema({
    Amount: {
        type: String
    },
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('lbamounts', lbamountSchema)