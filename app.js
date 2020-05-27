const Server = require('./server/server');
const Bot = new Server();

const initBot = () =>  {
  Bot.setUp();
  Bot.wod();
}

initBot();