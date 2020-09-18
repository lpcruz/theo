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
  return [{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:muscle: *Warmup - * ${randomizeWarmup(WARMUPS)}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:muscle: *WOD - * *${opts.rounds}*:${opts.wod}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:tv: *How-to Videos:*\n${opts.videoLinks}`
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
  const videos = json.workout.reduce((result, field, index) => {
    result[json.videos[index]] = field;
    return result;
  }, {});
  const formatVideoLinks = Object.entries(videos).map(link => {
    return link.join('|').split(',').map(i => '<' + i + '>').join('|');
  });
  const videoLinks = formatVideoLinks.join('\n');
  new Slack().notify(message({
    today,
    rounds,
    wod,
    videoLinks
  }), channel);
});

module.exports = {
  getWodForToday,
  randomizeWarmup,
}