var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
let CoreDeployerObj = require('./trufflehin/build/contracts/CoreDeployer.json')
let CoreObj = require('./trufflehin/build/contracts/Core.json')

//let obj2 = require('./trufflehin/build/contracts/Test.json')

var DeployerContractABI = JSON.stringify(CoreDeployerObj.abi)
// var DeployerContractAddress = CoreDeployerObj.networks['5777'].address
var DeployerContractAddress="0x8cdaf0cd259887258bc13a92c0a6da92698644c0";

// var DeployerContractBytecode = obj.bytecode
var DeployerContract = web3.eth.contract(JSON.parse(DeployerContractABI))
var CoreDeployer = DeployerContract.at(DeployerContractAddress);

var CoreContractABI = JSON.stringify(CoreObj.abi)
var CoreContract = web3.eth.contract(JSON.parse(CoreContractABI))
var  CoreInstance;

CoreDeployer.createCore("dsds","asset", {gas: '6000000'}, function (err, result) {
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})
// CoreDeployer.getAddressFromCores("gg", function(err, result) {
//          if(err){
//              console.log(err);
//          }else {
//              var CoreInstance = CoreContract.at(result);
//              CoreInstance.get("[opleaseyou","hash",4, {gas: '6000000'},function(err,res){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log(res);
//                 }
//             });
//          }
// })
CoreDeployer.getAddressFromCores("asset", function (err, result) {
    if(err){
        console.log(err);
    } else {
        console.log(result);
        var CoreInstance = CoreContract.at(result);
        console.log(result);
        CoreInstance.symbol(function (err,res)  {
            if(err){
                console.log(err);

            }
            else{
                console.log(res);
            }
        });
    }
})
