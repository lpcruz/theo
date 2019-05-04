const request = require('request');

class Slack { 
    notify(message) {
        request({
            uri: process.env.SLACK_URI,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            json: {
              attachments: [{
                  pretext: message,
                  fallback: message,
              }]
            }
          });
    }
}

module.exports = Slack;