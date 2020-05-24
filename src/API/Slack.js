const request = require('request');

const env = require('../../config/env');
const CHANNELS = require('../../shared/channels');

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
  notify(message, channel) {
    request({
      uri: channel,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        blocks: message,
      }
    });
  }

  sharePlaylist(opts) {
    let greeting;
    if (opts.message.text) {
      greeting = `<@${opts.message.user}> feeling${opts.message.text.split('feeling').pop()}? I got a playlist for you!`;
    }

    if (opts.message.reaction) {
      greeting = `<@${opts.message.user}> reacted with :${opts.message.reaction}: Here is a playlist that reminds me that!`; 
    }
    
    if (foodReactions.includes(opts.reaction)) {
      greeting = `<@${opts.message.user}> did you say ${opts.message.reaction}? I'm hungry now! Give me :${opts.message.reaction}: and I give you playlist about :${opts.message.reaction}:`;
    }

    if (drinkReactions.includes(opts.reaction)) {
      greeting = `<@${opts.message.user}> :${opts.message.reaction}: Arriba! Abajo! Al Centro! Pa' Dentro! :${opts.message.reaction}:\n I'm pretty good at spanish, right? Should I practice in #spanishpractice? :joy:\nHere's a playlist to toast to!`;
    }
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: greeting
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:headphones: <${opts.randomPlaylist.external_urls.spotify}|${opts.randomPlaylist.name}> \n ${opts.randomPlaylist.description || `A playlist about :${opts.message.reaction}:`} `
        },
        accessory: {
          type: 'image',
          image_url: opts.randomPlaylist.images[0].url,
          alt_text: `A playlist image triggered by ${opts.message.reaction}`
        }
      }
    ];
    if (opts.message.item.channel === CHANNELS.MUSIC) {
      this.notify(message, env.SLACK.MUSIC_URI);
    }
  }

  shareYelpBusiness(opts) {
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `I know a great place to get some${opts.search} called <${opts.biz.url}|${opts.biz.name}>. It has a ${opts.biz.rating}/5 rating:\n\n*${opts.biz.name}*\n${opts.biz.location.display_address}`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Here's what someone had to say about it:\n\n"${opts.review}"`
        }
      }
    ];
    this.notify(message, env.SLACK.NOM_NOM_URI);
  }

  giveTheWeather(opts) {
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Here's the weather in${opts.location} for today. Wash your hands and wear a mask if you go outside!`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `It is currently ${Math.floor(opts.weather.main.temp)}°F with ${opts.weather.weather[0].description}`
        }
      }
    ];
    this.notify(message, env.SLACK.ANNOUNCEMENTS_URI);
  }
}

module.exports = Slack;