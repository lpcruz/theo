const request = require('request');

class Slack { 
    notify(message, title, value) {
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
                  fields: [
                    {
                        title: title,
                        value: value,
                        short: true
                    }
                ],
              }]
            }
          });
    }
}

module.exports = Slack;