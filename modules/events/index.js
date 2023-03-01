/**
 * @module events
 * @desc Store event in database (for now just console.log)
 * @param {Object} event
 * @param {string} event.module - Module name that sent event
 * @param {string} event.action - Description of event
 * @param {string} event.description - Description of event
 * @param {string} event.prevValue - Previous value of event
 * @param {string} event.newValue - New value of event
 * @param {string} event.proof - Proof of event (e.g. transaction ID)
 * 
 */
const storeEvent = event => {
    console.info(`Event: ${new Date().toLocaleString()} - Module: ${event.module} - Action: ${event.action} - Description: ${event.description} - ${event.prevValue} - ${event.newValue} - ${event.proof}`)
}

module.exports = {
    storeEvent
};