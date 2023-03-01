# mintbox-poc
POC layout for MintBox

## Usage

### Step 1: Generate config

You can generate a config by calling the `questions.js` file within the config module:

```bash
node modules/config/questions.js
```

Answer the questions to generate a configuration for your NFT collection:

```
? What is your project name? MyDemoProject
? What is the total size of your NFT collection? 10
? Is your collection infinite? Yes
? What is the custom fee (percentage) you want to set? 10
```

### Step 2: Use the CLI to manage the project

Note: Not all functionality is implemented (like the actual interaction with Hedera Network). Two commands have been implemented: mint and transfer (token creation needs to be added)

You can use the CLI like this:

```bash
./mintbox.js help

// Output
Usage:
  mintbox mint <number>
  mintbox transfer
```

If you are unable to use the CLI tool like this, make sure to give it executable rights:

```sh
chmod +x mintbox.js
```

#### Command 1: Mint
You can call `./mintbox.js mint 10` to mint 10 new serials for your NFT. The state will be updated with the new holders for your NFT.

#### Command 2: Transfer
This command expects you to provide account IDs in the `files/transfer.csv` file who should receive your token.

You can execute the command by calling `./mintbox.js transfer`. Output:

```text
Event: 3/1/2023, 3:53:19 PM - Module: TRANSACTIONS - Action: NFT_TRANSFERRED - Description: Transferred NFT to 0.0.3612316 -  - 0.0.3612316 - myrandomtxID
Event: 3/1/2023, 3:53:19 PM - Module: TRANSACTIONS - Action: NFT_TRANSFERRED - Description: Transferred NFT to 0.0.3612311 -  - 0.0.3612311 - myrandomtxID2
Finished reading the CSV file.
```

**This command shows how we can use specific files as input/output for commands without having to upload a lot of data via the CLI.**