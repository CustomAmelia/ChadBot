const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
    Suggestion: {
        type: String
    },
    GuildID: String,
    GuildName: String,
    UserID: String,
    UserUsername: String

});

const MessageModel = module.exports = mongoose.model('suggestions', SuggestionSchema);