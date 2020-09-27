const mongoose = require('mongoose');

const BugReportSchema = new mongoose.Schema({
    Bug: {
        type: String
    },
    GuildID: String,
    GuildName: String,
    UserID: String,
    UserUsername: String
});

const MessageModel = module.exports = mongoose.model('bugreports', BugReportSchema);