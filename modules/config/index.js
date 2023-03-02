const fs = require('fs');
const path = require('path');

const { storeEvent } = require('../events');
const state = require('../state');

const defaultConfig = require('./default.config.json');

/**
 * @module Config
 * @desc: Create a config.json file in the root of the project with user preferences defined
 */

/**
 * @desc Process user questions into config.json
 * @param {Map} answers 
 * @param {string} answers.name - Project name
 * @param {number} answers.max_supply - Total size of NFT collection
 * @param {boolean} answers.supply_type - Is the collection infinite?
 * @param {number} answers.custom_fees - Custom fee percentage
 */
const processConfig = answers => {
    defaultConfig.name = answers.get('name');
    defaultConfig.max_supply = answers.get('max_supply');
    defaultConfig.supply_type = answers.get('supply_type') ? 'INFINITE' : 'FINITE';
    defaultConfig.custom_fees.fixed_fees[0].fee = answers.get('custom_fees');
    defaultConfig.storage_provider = answers.get('storage_provider');

    storeConfig(defaultConfig);
}

const storeConfig = config => {
    // Define the path to the file
    const configPath = path.join(__dirname, '..', '..', 'config.json');

    // Define the content to write to the file
    const content = JSON.stringify(config, null, 2);

    // Write the content to the file
    fs.writeFile(configPath, content, (error) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
    });

    storeEvent({
        module: 'CONFIG',
        action: 'CONFIG_CREATED',
        description: 'Config file created',
        prevValue: '',
        newValue: '',
        proof: ''
    });

    // Init the state of the application
    state.initState({
        ...config,
        current_supply: 0,
        owners: []
    });

    storeEvent({
        module: 'STATE',
        action: 'STATE_CREATED',
        description: 'Initial state created',
        prevValue: '',
        newValue: '',
        proof: ''
    });

    console.log(state.getState())
}

module.exports = {
    processConfig
};