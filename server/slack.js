const request = require('request');
const env = require('../config/env');

class Slack {
  notify(message) {
    request({
      uri: env.SLACK.SLACK_URI,
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