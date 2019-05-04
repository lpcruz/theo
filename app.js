const Server = require('./server/server');
const Bot = new Server();

initBot = () =>  {
    Bot.setUp();
}

initBot();