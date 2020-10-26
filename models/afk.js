const mongoose = require('mongoose');

const afkSchema = new mongoose.Schema({
    GuildID: String,
    UserID: String
});

const MessageModel = module.exports = mongoose.model('afkppl', afkSchema);