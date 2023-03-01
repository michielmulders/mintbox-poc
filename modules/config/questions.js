const inquirer = require('inquirer');

const { configModule } = require('..');

// Define the list of questions to ask the user
const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your project name?'
  },
  {
    type: 'number',
    name: 'max_supply',
    message: 'What is the total size of your NFT collection?'
  },
  {
    type: 'confirm',
    name: 'supply_type',
    message: 'Is your collection infinite?'
  },
  {
    type: 'number',
    name: 'custom_fees',
    message: 'What is the custom fee (percentage) you want to set?',
    validate: (input) => {
        if (input < 0 || input > 100) {
            return 'Please enter a number between 0 and 100';
        }
        return true;
    }
  }
];

// Define a map to store the results
const results = new Map();

async function askQuestions() {
  try {
    // Ask the questions using inquirer and wait for the answers
    const answers = await inquirer.prompt(questions);

    // Store the answers in the map, linked to their respective question IDs
    results.set('name', answers.name);
    results.set('max_supply', answers.max_supply);
    results.set('supply_type', answers.supply_type);
    results.set('custom_fees', answers.custom_fees);
    
    configModule.processConfig(results);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Start the prompt
askQuestions();
