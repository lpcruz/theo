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
  'wine_glass',
  'beer'
]

class Slack {
  notify(message, opts, channel) {
    request({
      uri: channel,
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
    if (opts.text) {
      message = `<@${opts.user}> ${opts.text.split('feeling').pop()}? I got a playlist for you!`;
    }

    if (opts.reaction) {
      message = `<@${opts.user}> reacted with :${opts.reaction}: Here is a playlist that reminds me that!`; 
    }
    
    if (foodReactions.includes(opts.reaction)) {
      message = `<@${opts.user}> did you say ${opts.reaction}? I'm hungry now! Give me :${opts.reaction}: and I give you playlist about :${opts.reaction}:`;
    }

    if (drinkReactions.includes(opts.reaction)) {
      message = `<@${opts.user}> :${opts.reaction}: Arriba! Abajo! Al Centro! Pa' Dentro! :${opts.reaction}:\n I'm pretty good at spanish, right? Should I practice in #spanishpractice? :joy:\nHere's a playlist to toast to!`;
    }

    // This will isolate the reaction and feeling triggers to the #music channel
    // @todo: Make this...better - lcruz
    if (opts.item.channel === 'C01411DMYGK') {
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
        }, env.SLACK.MUSIC_URI
      )
    }
  }

  shareYelpBusiness(message, review) {
    this.notify(message,
      {
        type: 'section',
        block_id: 'section567',
        text: {
          type: 'mrkdwn',
          text: `Here's what someone had to say about it:\n\n"${review}"`
        }
      }
    , env.SLACK.NOM_NOM_URI);
  }

  giveTheWeather(message, weather) {
    this.notify(message,
      {
        type: 'section',
        block_id: 'section567',
        text: {
          type: 'mrkdwn',
          text: `It is currently ${Math.floor(weather.main.temp)}°F with ${weather.weather[0].description}`
        }
      }
    , env.SLACK.ANNOUNCEMENTS_URI);
  }
}

module.exports = Slack;