const request = require('superagent');
const { CommandInteraction } = require('discord.js');

module.exports = {
    name: 'advice',
    description: 'gives a random life advice',
    cooldown: 3,
    execute(interaction) {
        request
            .get('http://api.adviceslip.com/advice')
            .end((err, res) => {
                if (!err && res.status === 200) {
                    try {
                        JSON.parse(res.text)
                    } catch (e) {
                        return message.reply(', an api error occurred.');
                    }
                    const advice = JSON.parse(res.text)
                    interaction.reply(advice.slip.advice)
                } else {
                console.error(`REST call failed: ${err}, status code: ${res.status}`)
                }
            });
    },
};