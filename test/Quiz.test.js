const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/QuizFactory.json');

let accounts;
let factory;
let quizAddress;
let quiz;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '4000000' });

    await factory.methods.createQuiz('标题1', '标题2').send({
        from: accounts[0], gas: '1000000'
    });

    [quizAddress] = await factory.methods.getDeployedQuiz(accounts[0]).call();
    quiz = await new web3.eth.Contract(JSON.parse(compiledQuiz.interface), quizAddress)

    // web3.setProvider(provider);
    
});

describe('Campaigns', () => {
    it('部署一个factory和campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(quiz.options.address);
    });
});