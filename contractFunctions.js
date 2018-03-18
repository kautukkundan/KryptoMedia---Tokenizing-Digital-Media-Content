var express     =   require('express');
var app         =   express();


var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

let CoreDeployerObj = require('./trufflehin/build/contracts/CoreDeployer.json');
let CoreObj = require('./trufflehin/build/contracts/Core.json');

//let obj2 = require('./trufflehin/build/contracts/Test.json')

var DeployerContractABI = JSON.stringify(CoreDeployerObj.abi);
var DeployerContractAddress = obj.networks['5777'].address;
// var DeployerContractBytecode = obj.bytecode
var DeployerContract = web3.eth.contract(JSON.parse(DeployerContractABI));
var CoreDeployer = DeployerContract.at(DeployerContractAddress);

var CoreContractABI = JSON.stringify(CoreObj.abi);
var CoreContract = web3.eth.contract(JSON.parse(CoreContractABI));

function returnContractInstance(_symbol){
    var CoreInstanceAddress = getAddressFromCores(_symbol);
    var CoreInstance = CoreContract.at(CoreInstanceAddress);
    return CoreInstance;
}

app.get("/createAsset/:sym/:name",function (req, res) {
    var _symbol=req.params.sym;
    var _name=req.params.name;
        CoreDeployer.createCore(_name,_symbol, {gas: '6000000'}, function (err, result) {
            if(err){
                console.log(err);
            }else {
                console.log(result);
            }
        })
    });

app.get("/getAddressFromCores",function (req, res) {
    _symbol = req.params._symbol;
        CoreDeployer.getAddressFromCores(_symbol, function (err, result) {
            if(err){
                console.log(err);
            } else {
                console.log(result);
                return result;
            }
        })
    
});


//app.get("/transfer/:sym/:token/:to")

app.get("/generateAsset",function (req,res) {
    var _symbol = req.params._symbol;
    var personalMessage = req.params.personalMessage;  
    var hash  = req.params.hash;   
    var _assetType = req.params._assetType;  
        

        var instance = returnContractInstance(_symbol);
        instance._generateAssets(personalMessage,hash,_assetType,function(err,result){
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
            }
        });
});

app.get("/getOwnerFromId",function (req, res) {
    
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
});

app.get("/getAssetDetails",function (req, res) {
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
});

app.get("/getAssetDetails",function (req, res) {
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
    };
});



app.listen(8000,function () {
   console.log("8000 port started")
});
