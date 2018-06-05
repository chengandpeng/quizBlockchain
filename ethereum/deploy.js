const path = require('path');
const fs = require('fs');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/QuizFactory.json');
// const compiledFactory = require('./build/CampaignFactory.json');

const { MNEMONIC, INFURA_URL} = process.env;

// check mnemonic and infura_url
if ( !MNEMONIC || !INFURA_URL )  {
    console.log("ERROR:Please set MNEMONIC and INFURA_URL value in .env file");
    process.exit(1);
}

const provider = new HDWalletProvider(MNEMONIC, INFURA_URL);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deply account:', accounts[0]);

    // deploy contract
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ 
            gas: '4000000', 
            // gasPrice: '10000000000', 
            from: accounts[0] })
        .catch(err => console.log(err));

    result && fs.writeFile('ADDRESS', result.options.address, err => {
        if(err) throw err;
        console.log('Contract deployed to:', result.options.address);    
    });
}; 
deploy();