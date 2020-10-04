const express = require('express');
const Server = require('./server/server');
const Theo = new Server(express());

const initTheo = () =>  {
  Theo.setUp();
}

initTheo();