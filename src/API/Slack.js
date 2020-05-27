const request = require('request');

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

const greetings = [
  ':wave: ¡?QUE LO QUE?!',
  ':wave: ¡Di me lo!',
  ':wave: Hi, how are you?',
  ':wave: kumusta ka?',
  ':wave: Hope you are having a good day!',
  `:face_with_rolling_eyes: ...oh it's you...`
];

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

  greet(opts) {
    const channel = getChannel(opts.message.channel);
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${randomGreeting} <@${opts.message.user}>`
        }
      }
    ];
    this.notify(message, channel);
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

  giveCovidDataByState(opts) {
    const channel = getChannel(opts.message.channel);
    const message = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:bar_chart: :earth_americas: Providing real-time COVID-19 data for ${opts.covid19StateData[0].USAState}:`
        }
      },
      {
        type: 'section',
        block_id: 'section789',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total Cases*\n${opts.covid19StateData[0].TotalCases}`
          },
          {
            type: 'mrkdwn',
            text: `*Total Deaths*\n${opts.covid19StateData[0].TotalDeaths}`
          },
          {
            type: 'mrkdwn',
            text: `*Total Tests*\n${opts.covid19StateData[0].TotalTests}`
          },
          {
            type: 'mrkdwn',
            text: `*New Casess*\n${opts.covid19StateData[0].NewCases || '0'}`
          },
          {
            type: 'mrkdwn',
            text: `*New Deaths*\n${opts.covid19StateData[0].NewDeaths || '0'}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'For more information, please see the <https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html|CDC Website> and wash your hands! :open_hands:'
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
          },
          {
            type: 'mrkdwn',
            text: '*Get Covid19 Data (only available for US States):*\n covid19 data for `US State`'
          }
        ]
      }
    ];
    this.notify(message, channel);
  }
}

module.exports = Slack;