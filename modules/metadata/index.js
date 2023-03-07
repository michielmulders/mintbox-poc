const fs = require('fs');
const path = require('path');

const csv = require('csv-parser');
const { validator, defaultVersion } = require('@hashgraph/nft-utilities');
const Mustache = require('mustache');
Mustache.escape = function (value) { // disable escaping values
    return value;
};

const metadataTemplate = fs.readFileSync(path.join(__dirname, 'metadata.json'), 'utf8');

const generateMetadata = () => {
    const csvpath = path.join(__dirname, '..', '..', 'files', 'metadata.csv');
    let count = 1;

    fs.createReadStream(csvpath)
        .pipe(csv())
        .on('data', (data) => {
            const metadata = Mustache.render(metadataTemplate, data);

            // Verify metadata using nft-utilities package (checking for errors only here)
            const { warnings, errors } = validator(JSON.parse(metadata), defaultVersion);
            if (errors.length > 0) {
                console.error(`Metadata ${count} is not valid: ${JSON.stringify(errors)}`);
                // continue minting - user can decide what to do with the invalid metadata
            }

            const filename = `${count}.json`;
            const filepath = path.join(__dirname, '..', '..', 'files', 'metadata', filename);
            fs.writeFileSync(filepath, metadata);
            count++;
        })
        .on('end', () => {
            console.info('Finished reading the CSV file.');
        });

}

module.exports = {
    generateMetadata
}