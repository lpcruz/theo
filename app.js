const express = require('express');
const request = require('request-promise');
const slackEventsApi = require('@slack/events-api');
const Server = require('./server/server');
const Theo = new Server(express, request, slackEventsApi);

Theo.start();