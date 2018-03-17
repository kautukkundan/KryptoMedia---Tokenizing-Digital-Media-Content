var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
<<<<<<< HEAD
    web3 = new Web3(web3.currentProvider);
=======
    // web3 = new Web3(web3.currentProvider);
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
>>>>>>> e0f80178c04f86e401870e813758539db7acd319
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

<<<<<<< HEAD
//console.log(AbiAddress);
//var DeployerContract = web3.eth.contract(AbiAddress.deployer_abi);
var DeployerContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "cores",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "symbol",
                "type": "string"
            }
        ],
        "name": "createCore",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]);
var Deployer = DeployerContract.at('0xc0ed63e3a70bfcb003452b1cc083db822e1f23e1');

// console.log(Deployer);
console.log(Deployer.createCore)
Deployer.createCore("Drama","Ghd", {from: web3.eth.accounts[0]}).then((err, result) => {
=======
// console.log(web3)

//console.log(AbiAddress);
//var DeployerContract = web3.eth.contract(AbiAddress.deployer_abi);
let obj = require('./trufflehin/build/contracts/CoreDeployer.json')
let obj2 = require('./trufflehin/build/contracts/Test.json')

var DeployerContractABI = JSON.stringify(obj.abi)
var DeployerContractAddress = obj.networks['5777'].address
// var DeployerContractBytecode = obj.bytecode
var DeployerContract = web3.eth.contract(JSON.parse(DeployerContractABI))
var CoreDeployer = DeployerContract.at(DeployerContractAddress);
// console.log(CoreDeployer)
// console.log()
// Deployer.cores(1,function (err, res) {
//
//     console.log(err);
// });
CoreDeployer.createCore("Drama","Ghd", {gas: '6000000'}, function (err, result) {
>>>>>>> e0f80178c04f86e401870e813758539db7acd319
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})
<<<<<<< HEAD
//console.log(Deployer.cores[0]);
=======
// CoreDeployer.hi((err, val) => {
//   if (!err) {
//     console.log(val)
//   }
// })
//console.log(Deployer.cores[0]);
>>>>>>> e0f80178c04f86e401870e813758539db7acd319
