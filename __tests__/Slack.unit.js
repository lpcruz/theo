'use strict';
const Slack = require('../src/API/Slack');

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
          channel: 'FOOBAZBAR1234'
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
          channel: 'FOOBAZBAR1234'
        }
      };
      expect(slack.greet(message)).toMatchSnapshot();
    });
  });
});