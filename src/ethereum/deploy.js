/*eslint no-console: [0] */

const path = require('path');
const fs = require('fs');
require('dotenv').config({path: path.resolve(__dirname, '../..', '.env')});

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/QuizFactory.json');

const { MNEMONIC, INFURA_URL} = process.env;

// check mnemonic and infura_url
if ( !MNEMONIC || !INFURA_URL )  {
	console.warn('ERROR:Please set MNEMONIC and INFURA_URL value in .env file');
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
			gas: '2000000', 
			from: accounts[0] })
		.catch(err => console.log(err));

	const content = JSON.stringify({ address: result.options.address });
	result && fs.writeFile('ADDRESS.json', content, err => {
		if(err) throw err;
		console.log('Contract deployed to:', result.options.address);    
	});
}; 
deploy();