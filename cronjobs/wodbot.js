const htmlToJson = require('html-to-json');

const Slack = require('../src/API/Slack');
const WARMUPS = require('../shared/wod/warmups');
const feed = 'http://strengthreliance.com/bodyweight-workout-generator';
const data = {
  date: ['.col-sm-12 h3', item => {
    return item.text();
  }],
  rounds: ['.col-sm-12 strong', item => {
    return item.text();
  }],
  wod: ['.row .col-sm-12 ul', item => {
    return item.text();
  }],
  videos: ['iframe', item => {
    return item.attr('src');
  }],
  workout: ['.col-md-5 h3', item => {
    return item.text();
  }]
};
const randomizeWarmup = warmups => {
  const keys = Object.keys(warmups);
  return warmups[keys[keys.length * Math.random() << 0]];
};
const message = opts => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `@here Tomorrow's workout! Have *fun* and *pace* yourself.\n You can even ask me for a workout playlist. :headphones::musical_note:\nLet #workouts know how it went! :woman-lifting-weights: :man-lifting-weights: :muscle: :muscle: `
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Warmup - * ${randomizeWarmup(WARMUPS)}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*WOD - * *${opts.rounds}*:${opts.wod}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*How-to Videos:*\n${JSON.stringify(opts.videos, '', 1).replace(/[{}",]/g, '')}`
      }
    }
  ];
};
const getWodForToday = channel => htmlToJson.request(feed, data, (err, result) => {
  if (err) throw err;
  const json = JSON.parse(JSON.stringify(result, null, 3));
  const today = json.date[0];
  const rounds = json.rounds[0];
  const wod = json.wod[0].replace(/\t/g, '');
  const videos = json.videos.reduce((result, field, index) => {
    result[json.workout[index]] = field;
    return result;
  }, {});
  new Slack().notify(message({ today, rounds, wod, videos }), channel);
});

module.exports = {
  getWodForToday
}