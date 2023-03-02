const { storeEvent } = require("../events");

// Interface for a storage provider
class StorageProvider {
  constructor() {}

  // Get data from the storage provider
  async get(key) {}

  // Store data in the storage provider
  async store(value) {}
}

class IPFSStorageProvider extends StorageProvider {
  constructor() {
    super();
    console.log("Initialized IPFS storage provider");
  }

  async get(key) {
    console.log(`Retrieved ${key} from local storage`);
    return "value";
  }

  async store(value) {
    // ipfs do something with value
    storeEvent({
      module: "STORAGE",
      action: "STORE_IPFS",
      description: "Stored NFT metadata on IPFS",
      prevValue: "",
      newValue: "returnedhashfromIPFS",
      proof: "",
    });
  }
}

class NFTStorageStorageProvider extends StorageProvider {
  constructor() {
    super();
    console.log("Initialized NFT.Storage storage provider");
  }

  async get(key) {
    console.log(`Retrieved ${key} from local storage`);
    return "value";
  }

  async store(value) {
    // nft.storage do something with value
    storeEvent({
      module: "STORAGE",
      action: "STORE_NFTSTORAGE",
      description: "Stored NFT metadata on NFT.Storage",
      prevValue: "",
      newValue: "returnedhashfromNFTStorage",
      proof: "",
    });
  }
}

// Export multiple storage providers
module.exports = {
  ipfs: new IPFSStorageProvider(),
  nftstorage: new NFTStorageStorageProvider()
};
