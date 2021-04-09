const path = require('path');
const fs = require('fs');
const solc = require('solc');

//for unix and windows
//take you from root dir to this inbox folder and both files
const inboxpath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// read contents of file with encoding
const source = fs.readFileSync(inboxpath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

// parses solidity to English and strings
var output = JSON.parse(solc.compile(JSON.stringify(input)));

var outputContracts = output.contracts['Inbox.sol']['Inbox']

// exports ABI interface
module.exports.abi = outputContracts.abi;

// exports bytecode from smart contract
module.exports.bytecode = outputContracts.evm.bytecode.object;

