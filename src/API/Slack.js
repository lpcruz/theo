const request = require('request');
const env = require('../../config/env');

const foodReactions = [
  'pizza',
  'sushi',
  'ramen',
  'taco',
  'burrito',
  'hamburger',
  'fries',
  'fried_shrimp',
  'fish',
  'rice',
  'bacon'
];

const drinkReactions = [
  'beers',
  'cocktail',
  'wine_glass'
]

class Slack {
  notify(message, opts) {
    request({
      uri: env.SLACK.SLACK_URI,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        blocks: [{
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message
          },
        }, opts],
      }
    });
  }

  sharePlaylist(opts, playlist) {
    let message;
    message = `<@${opts.user}> reacted with :${opts.reaction}: Here are a playlist that reminds me that!`
    
    if (foodReactions.includes(opts.reaction)) {
      message = `<@${opts.user}> did you say ${opts.reaction}? I'm hungry now! Give me :${opts.reaction}: and I give you playlist about :${opts.reaction}:`;
    }

    if (drinkReactions.includes(opts.reaction)) {
      message = `<@${opts.user}> :${opts.reaction}: Arriba! Abajo! Al Centro! Pa' Dentro! :${opts.reaction}:\n I'm pretty good at spanish, right? Should I practice in #spanishpractice? :joy:\nHere's a playlist to toast to!`;
    }
    
    this.notify(message,
      {
        type: 'section',
        block_id: 'section567',
        text: {
          type: 'mrkdwn',
          text: `:headphones: <${playlist.external_urls.spotify}|${playlist.name}> \n ${playlist.description || `A playlist about :${opts.reaction}:`} `
        },
        accessory: {
          type: 'image',
          image_url: playlist.images[0].url,
          alt_text: `A playlist image triggered by ${opts.reaction}`
        }
      }
    )
  }
}

module.exports = Slack;