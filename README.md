# mintbox-poc
POC layout for MintBox

## Usage

Install requirements

```sh
npm install
```

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
? What is the storage provider you want to use? ipfs
```

#### Add custom storage components

This is a sample interface for the storage component which allows devs to create their own interface and export it with their custom name. 

```js
class StorageProvider {
  constructor() {}

  // Get data from the storage provider
  async get(key) {}

  // Store data in the storage provider
  async store(value) {}
}
```

When answering the question about the storage provider, make sure to enter the label defined when exporting. Current options are `ipfs` and `nftstorage`.

```js
// Export multiple storage providers
module.exports = {
  ipfs: new IPFSStorageProvider(),
  nftstorage: new NFTStorageStorageProvider()
};
```

If you would define your own storage provider, export it here as well with your custom label.

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

```text
Event: 3/2/2023, 12:27:45 PM - Module: STORAGE - Action: STORE_IPFS - Description: Stored NFT metadata on IPFS -  - returnedhashfromIPFS -
```

#### Command 2: Transfer
This command expects you to provide account IDs in the `files/transfer.csv` file who should receive your token.

You can execute the command by calling `./mintbox.js transfer`. Output:

```text
Event: 3/1/2023, 3:53:19 PM - Module: TRANSACTIONS - Action: NFT_TRANSFERRED - Description: Transferred NFT to 0.0.3612316 -  - 0.0.3612316 - myrandomtxID
Event: 3/1/2023, 3:53:19 PM - Module: TRANSACTIONS - Action: NFT_TRANSFERRED - Description: Transferred NFT to 0.0.3612311 -  - 0.0.3612311 - myrandomtxID2
Finished reading the CSV file.
```

**This command shows how we can use specific files as input/output for commands without having to upload a lot of data via the CLI.**