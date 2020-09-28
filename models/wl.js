const mongoose = require('mongoose');

const WlSchema = new mongoose.Schema({
    GuildID: {
        type: String
    }
});

const MessageModel = module.exports = mongoose.model('whitelists', WlSchema);