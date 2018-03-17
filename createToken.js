var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

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
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})
//console.log(Deployer.cores[0]);