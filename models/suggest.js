const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
    Suggestion: {
        type: String
    },
    GuildID: String,
    UserID: String
});

const MessageModel = module.exports = mongoose.model('suggestions', SuggestionSchema);