var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    // web3 = new Web3(web3.currentProvider);
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

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
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})
// CoreDeployer.hi((err, val) => {
//   if (!err) {
//     console.log(val)
//   }
// })
//console.log(Deployer.cores[0]);
