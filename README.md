# Quiz Blockchain
一个学习性质的基于以太坊的竞猜区块链应用

# How to run
## Install npm package
make sure node version > 8
```
npm install
```

## Compile
```
npm run compile
```
可以看到ethereum/build下面有编译出的smart contract文件

## Deploy
在根目录新建一个`.env`文件，输入自己的钱包nemonic和infura链接


[infura](https://infura.io/)可以提供连接到以太坊的API接口。

```
NEMONIC={钱包地址}
INFURA_URL={infura链接}
```

保存完毕后

```
npm run deploy
```

## Run
```
npm start
```