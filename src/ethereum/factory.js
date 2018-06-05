import web3 from './web3';
import QuizFactory from './build/QuizFactory.json';
import ADDRESS from './ADDRESS.json';

const instance = new web3.eth.Contract(
	JSON.parse(QuizFactory.interface),
	ADDRESS.address
);

export default instance;