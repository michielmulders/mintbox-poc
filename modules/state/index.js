/**
 * @module State
 * @desc: Store the state of the application or change the state of the application
 */

const fs = require('fs');
const path = require('path');

class StateComponent {
  constructor() {
    this.state = {};
    this.filepath = path.join(__dirname, '..', '..', 'state.json');
    this.loadState();
  }

  /**
   * @desc Initialize the state of the application
   * @param {Object} state 
   */
  initState(state) {
    this.state = state;
    this.saveState();
  }

  /**
   * @desc Load the state of the application from JSON file
   */
  loadState() {
    try {
      const data = fs.readFileSync(this.filepath);
      this.state = JSON.parse(data);
    } catch (err) {
      console.error(`Failed to load state from ${this.filepath}: ${err}`);
    }
  }

  /**
   * @desc Save the state of the application to JSON file
   * @returns {boolean} true if state was saved, false if not
   */
  saveState() {
    try {
      fs.writeFileSync(this.filepath, JSON.stringify(this.state));
      return true;
    } catch (err) {
      console.error(`Failed to save state to ${this.filepath}: ${err}`);
      return false;
    }
  }

  /**
   * @desc Update the state of the application
   * @param {string} prop
   * @param {*} value 
   * @returns {boolean} true if state was updated, false if not
   */
  setState(prop, value) {
    if (!prop || !value) {
      console.error(`Failed to update state: invalid prop or value: ${prop}, ${value}`);
      return false;
    }

    this.state[prop] = value;
    return this.saveState();
  }

  getState() {
    return this.state;
  }

  resetState() {
    this.state = {};
    this.saveState();
  }
}

module.exports = new StateComponent();