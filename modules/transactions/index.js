// import state
const state = require('../state');
const eventsModule = require('../events');
const storageModule = require('../storage');

/**
 * @desc Mint an NFT and update state
 * @param {number} amount 
 */
const mintNFT = (amount) => {
    // 1. get the current state
    const appState = state.getState();

    // 2. get the config
    // could get the config to see what the max supply/custom fees are or could just use the state (store it here)
    
    // 3. check if new serials can be minted
    if (appState.supply_type === "INFINITE" || (appState.supply_type === "FINITE" && (appState.current_supply + amount) < appState.max_supply)) {
        // Mint
        // placeholder for minting NFT on Hedera

        // Store image
        const storageProvider = storageModule[appState.storage_provider];
        storageProvider.store("myimage.jpg");
        
        // Store event and update state
        eventsModule.storeEvent({
            module: 'TRANSACTIONS',
            action: 'NFT_MINTED',
            description: `Minted ${amount} NFTs`,
            prevValue: appState.current_supply,
            newValue: (appState.current_supply + amount),
            proof: 'myrandomtxID'
        });

        state.setState('current_supply', (appState.current_supply + amount));

        // return the nft (example)
        return ['0.0.134/1', '0.0.134/2', '0.0.134/3', '0.0.134/4', '0.0.134/5'];
    } else {
        throw new Error('You can not mint more NFTs than the max supply');
    }
};

/**
 * @desc Transfer NFT from treasury to user
 * @param {string} to 
 */
const transferNFTfromTreasury = (to) => {
    // Transfer NFT and make sure that user user account exists and has associated NFT
    // placeholder for transfering NFT on Hedera (get tokenId from state or config)

    // Store event and update state
    eventsModule.storeEvent({
        module: 'TRANSACTIONS',
        action: 'NFT_TRANSFERRED',
        description: `Transferred NFT to ${to}`,
        prevValue: '',
        newValue: `${to}`,
        proof: 'myrandomtxID'
    });

    state.setState('owners', [...state.getState().owners, to]);
};

module.exports = {
    mintNFT,
    transferNFTfromTreasury
};