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
  
  describe('greet', () => {
    it('should wave back', () => {
      const message = {
        message: {
          user: 'dev',
          channel: fakeChannel.CHANNEL_ID
        }
      };
      expect(slack.greet(message)).toMatchSnapshot();
    });
  });
  
  describe('help', () => {
    it('should provide instructions', () => {
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