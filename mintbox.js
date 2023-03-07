#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const readline = require('readline');
const csv = require('csv-parser');

const { transactionsModule } = require('./modules');

/* Command handlers */
function handleMint(input) {
  transactionsModule.mintNFT(Number(input));
}

function handleTransfer() {
  const csvpath = path.join(__dirname, 'files', 'transfer.csv');

  // first check if there's data in the file
  // placeholder for code checking if the file is empty

  fs.createReadStream(csvpath)
    .pipe(csv())
    .on('data', (row) => {
      // Called for each row in the CSV file (later add checks to see if the row is valid - valid accountID?)
      transactionsModule.transferNFTfromTreasury(row.to);
    })
    .on('end', () => {
      // Called when the end of the file is reached
      console.info('Finished reading the CSV file.');
    });
}

function handleSwitch(input) {
  console.log('Switching to network: ' + input);
  console.log('Function not implemented');
}

function handleHelp() {
  console.log('Usage:');
  console.log('  mintbox mint <number>');
  console.log('  mintbox transfer');
  console.log('  mintbox switch <network>');
}

function handleUnknownCommand() {
  console.log('Unknown command. Type "mintbox help" for usage.');
}

// Create a readline interface to read input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Parse the command line arguments
const [,, command, ...input] = process.argv;

// Handle the command based on the user input
switch (command) {
  case 'mint':
    handleMint(input.join(' '));
    break;
  case 'transfer':
    handleTransfer(input.join(' '));
    break;
  case 'switch':
    handleSwitch(input.join(' '));
    break;
  case 'help':
    handleHelp();
    break;
  default:
    handleUnknownCommand();
    break;
}

// Close the readline interface when done
rl.close();
