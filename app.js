const express = require('express');
const request = require('request-promise');
const Server = require('./server/server');
const Theo = new Server(express(), request);

const initTheo = () =>  {
  Theo.setUp();
}

initTheo();