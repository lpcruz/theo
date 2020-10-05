'use strict';
const Slack = require('../src/API/Slack');

const fakeChannel = {
  NAME: '#dev',
  CHANNEL_ID: 'C0145H2QG74',
  SLACK_HOOK: 'foobarbazhook1234'
}

describe('Slack', () => {
  let request;
  let slack;
  
  beforeEach(() => {
    request = jest.fn();
    slack = new Slack(request);
  });
  
  describe('greetings', () => {
    it('should do something', () => {
      const message = {
        message: {
          user: 'dev',
          channel: fakeChannel.CHANNEL_ID
        }
      };
      expect(slack.greet(message)).toMatchSnapshot();
    });
  });
});