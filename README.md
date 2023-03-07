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

**Note: You can copy the `config.json` file and import it into a new project. It contains all settings to run your project within a new project environment. Make sure to copy your data like image and metadata files if you have created those.**

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
  mintbox switch <network>
  mintbox metadata
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

#### Command 3: Switch

(this command is not implemented but added as a reference) Here you can switch the network for the project. 

#### Command 4: Metadata

The metadata command makes use of the [Mustache package](https://www.npmjs.com/package/mustache) which lets you create logic-less templates (interpolation using this format: `{{myVar}}`). 

The `/modules/metadata/metadata.json` file represents the template for the metadata.

```json
{
    "name": "Bored Hederas Club",
    "description": "NFT project cloning bored apes",
    "type": "image/png",
    "image": "{{image}}",
    "properties": {
        "website": "{{website}}"
    }
}
```

Next, you define the metadata values for each NFT in the `/files/metadata.csv` file.

```csv
image,website
https://mysite.com/fullspec/1,https://mysite.com/nft/1
https://mysite.com/fullspec/2,https://mysite.com/nft/2
```

When you execute the `./mintbox.js metadata` command, it will interpolate these values and store the new metadata files in the `/files/metadata/` folder. Here's an example output for the first NFT in the collection.

```json
{
    "name": "Bored Hederas Club",
    "description": "NFT project cloning bored apes",
    "type": "image/png",
    "image": "https://mysite.com/fullspec/1",
    "properties": {
        "website": "https://mysite.com/nft/1"
    }
}
```

After each metadata file has been interpolated, we check the metadata structure against Token Metadata JSON Schema V2 using the [Hedera NFT Utilities](https://github.com/hashgraph/hedera-nft-utilities) package.

If you make a mistake against the schema, the error will be printed but the metadata will still be created. It's up to the user to make changes to their metadata or ignore the errors when they know what they are doing.