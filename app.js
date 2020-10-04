const Server = require('./server/server');
const Bot = new Server();

const initBot = () =>  {
  Bot.setUp();
}

initBot();