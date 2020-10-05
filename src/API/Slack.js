'use strict';
const CHANNELS = require('../../shared/channels');

function getChannel(message) {
  const channel = CHANNELS.filter(channel => channel.CHANNEL_ID === message);
  return channel[0].SLACK_HOOK;
}

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
];

class Slack {
  constructor(request) {
    this.request = request;
  }

  notify(message, channel) {
    this.request({
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

  greet(opts) {
    const channel = getChannel(opts.message.channel);
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:wave: <@${opts.message.user}>!`
        }
      }
    ];
    this.notify(message, channel);
    return message;
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
    
    if (opts.message.channel) {
      const channel = getChannel(opts.message.channel);
      this.notify(message, channel);
      return;
    }

    if (opts.message.item.channel === 'C01411DMYGK' || opts.message.item.channel === 'C0145H2QG74') {
      const channel = getChannel(opts.message.item.channel);
      this.notify(message, channel);
    }
  }

  shareYelpBusiness(opts) {
    const channel = getChannel(opts.message.channel);
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
    this.notify(message, channel);
  }

  giveTheWeather(opts) {
    const channel = getChannel(opts.message.channel);
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Here's the weather in${opts.location} for today. Wash your hands and wear a mask if you go outside! :mask:`
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
    this.notify(message, channel);
  }

  shareRecipeList(opts) {
    const channel = getChannel(opts.message.channel);
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `I found this recipe for ${opts.query}. If you want another one, just ask me again!`
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<${opts.randomRecipe.sourceUrl}|${opts.randomRecipe.title}>\n*Ready Time (min):* ${opts.randomRecipe.readyInMinutes}\n*Servings:* ${opts.randomRecipe.servings}` 
        },
        accessory: {
          type: 'image',
          image_url: opts.photo,
          alt_text: `A photo of ${opts.randomRecipe.title}`
        }
      }
    ];
    this.notify(message, channel);
  }
  
  help(opts) {
    const channel = getChannel(opts.message.channel);
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:wave: Hi <@${opts.message.user}> Need help? I'm Theo and am you're friendly neighborhood sidekick. I'm still learning new things but below is a list of commands and things that I can do for you. Mention me before each!`
        }
      },
      {
        type: 'section',
        block_id: 'section789',
        fields: [
          {
            type: 'mrkdwn',
            text: '*Search for Businesses:*\n search `business` in `location`'
          },
          {
            type: 'mrkdwn',
            text: '*Get a Spotify Playlist (only available in the #music channel):*\n feeling `feeling`'
          },
          {
            type: 'mrkdwn',
            text: '*Get Weather:*\n weather in `location`'
          }
        ]
      }
    ];
    this.notify(message, channel);
  }
}

module.exports = Slack;
