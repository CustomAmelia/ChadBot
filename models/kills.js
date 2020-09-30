const mongoose = require('mongoose');

const killsSchema = new mongoose.Schema({
    Kills: {
        type: String
    },
    GuildID: String,
    UserID: String
});

const MessageModel = module.exports = mongoose.model('kills', killsSchema);