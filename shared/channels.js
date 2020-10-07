const { SLACK } = require('../config/env');

const CHANNELS = [
  {
    NAME: '#fake-channel',
    CHANNEL_ID: 'FOOBAZBAR1234',
    SLACK_HOOK: 'JUSTFORTESTING'
  },
  {
    NAME: '#dev',
    CHANNEL_ID: 'C0145H2QG74',
    SLACK_HOOK: SLACK.DEV_URI
  },
  {
    NAME: '#music',
    CHANNEL_ID: 'C01411DMYGK',
    SLACK_HOOK: SLACK.MUSIC_URI
  },
  {
    NAME: '#nom-nom',
    CHANNEL_ID: 'C0142CAFJ3C',
    SLACK_HOOK: SLACK.NOM_NOM_URI
  },
  {
    NAME: '#announcements',
    CHANNEL_ID: 'C013Y3RRX0A',
    SLACK_HOOK: SLACK.ANNOUNCEMENTS_URI
  },
  {
    NAME: '#spanishpractice',
    CHANNEL_ID: 'C013MJEBM1V',
    SLACK_HOOK: SLACK.SPANISH_PRACTICE_URI
  },
  {
    NAME: '#workouts',
    CHANNEL_ID: 'C013ZG431EJ',
    SLACK_HOOK: SLACK.WORKOUTS_URI
  }
];

module.exports = CHANNELS;
