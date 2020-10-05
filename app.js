require('dotenv').config();
const express = require('express');
const request = require('request-promise');
const path = require('path');
const figlet = require('figlet');
const cron = require('node-cron');
const slackEventsApi = require('@slack/events-api');
const Server = require('./server/server');
const env = require('./config/env');

const theoOpts = {
  express,
  request,
  slackEventsApi,
  path,
  figlet,
  cron,
  env
}
const Theo = new Server(theoOpts);
Theo.start();
