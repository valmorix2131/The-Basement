const { Schema, model } = require('mongoose');

const requiredString  = { type: String, required: true };
const requiredNumber  = { type: Number, required: true };

module.exports = model('confessions', Schema({
    guildId: requiredNumber,
    memberId: requiredNumber,
    confessionId: requiredNumber,
    confession: requiredString,
}));