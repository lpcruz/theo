require('dotenv').config();
const express = require('express');
const request = require('request-promise');
const path = require('path');
const figlet = require('figlet');
const cron = require('node-cron');
const slackEventsApi = require('@slack/events-api');
const Server = require('./server/server');

const theoOpts = {
  express,
  request,
  slackEventsApi,
  path,
  figlet,
  cron
}
const Theo = new Server(theoOpts);
Theo.start();
