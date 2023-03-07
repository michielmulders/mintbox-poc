const configModule = require('./config');
const eventsModule = require('./events');
const stateModule = require('./state');
const transactionsModule = require('./transactions');
const storageModule = require('./storage');
const metadataModule = require('./metadata');

module.exports = {
    configModule,
    eventsModule,
    stateModule,
    transactionsModule,
    storageModule,
    metadataModule
};