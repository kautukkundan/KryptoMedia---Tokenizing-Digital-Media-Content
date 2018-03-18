
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

let CoreDeployerObj = require('./trufflehin/build/contracts/CoreDeployer.json')
let CoreObj = require('./trufflehin/build/contracts/Core.json')

//let obj2 = require('./trufflehin/build/contracts/Test.json')

var DeployerContractABI = JSON.stringify(CoreDeployerObj.abi)
var DeployerContractAddress = obj.networks['5777'].address
// var DeployerContractBytecode = obj.bytecode
var DeployerContract = web3.eth.contract(JSON.parse(DeployerContractABI))
var CoreDeployer = DeployerContract.at(DeployerContractAddress);

var CoreContractABI = JSON.stringify(CoreObj.abi)
var CoreContract = web3.eth.contract(JSON.parse(CoreContractABI))

function createAsset(_symbol , _name) {
    CoreDeployer.createCore(_name,_symbol, {gas: '6000000'}, function (err, result) {
        if(err){
            console.log(err);
        }else {
            console.log(result);
        }
    })
}
function getAddressFromCores(_symbol){
    CoreDeployer.getAddressFromCores(_symbol, function (err, result) {
        if(err){
            console.log(err);
        } else {
            console.log(result);
            return result;
        }
    })
}
function returnContractInstance(_symbol){
    var CoreInstanceAddress = getAddressFromCores(_symbol);
    var CoreInstance = CoreContract.at(CoreInstanceAddress);
    return CoreInstance;
}

function generateAsset(_symbol,personalMessage,hash,_assetType){ 
    var instance = returnContractInstance(_symbol);
    instance._generateAssets(personalMessage,hash,_assetType,function(err,result){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    }); 
}

function getOwnerFromId(_symbol,tokenId){
    var instance = returnContractInstance(_symbol);
    instance.tokenIndexToOwner(tokenId,function(err,result){
        if(err){
            console.log(err);
        }else {
            console.log(result);
            return result;
        }
    })
}
function getAssetDetails(_symbol,tokenId){
    var instance = returnContractInstance(_symbol);
    CoreInstance.assets(tokenId,function(err,res){
        if(err){
            console.log(err);
        }else {
            console.log("the result is"+res);
            return res;
        } 
     }) 
}

var transferAsset = function (_symbol,tokenId,to){
    var instance = returnContractInstance(_symbol);
    instance.transfer(to.toString(),tokenId,function(err,res){
        if(err)
        {
            console.log("error"+err);
        }
        else{
            console.log("result obtained"+res);
        }
    })
}
module.exports=transferAsset;


