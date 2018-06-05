const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const mainFile = 'QuizFactory.sol';

/**
 * import callback
 */
function findImports (path) {
	if(path) {
		return {
			'contents': fs.readFileSync(getContractPath(path), 'utf8')
		}
	}
}

/**
 * 获取sol文件路径
 */
function getContractPath(fileName) {
	return path.resolve(__dirname, 'contracts', fileName);
}

// 编译compile
const source = fs.readFileSync(getContractPath(mainFile), 'utf8');
const inputs = { mainFile: source };
const output = solc.compile({sources: inputs}, 1, findImports).contracts;

// 准备build目录
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

// 将编译的contract输出到文件
for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract.split(':')[1] + '.json'),
		output[contract]
	)
}