// var Migrations = artifacts.require("./Migrations.sol")
var AssetBase = artifacts.require('./AssetBase.sol')
var CoreDeployer = artifacts.require('./CoreDeployer.sol')
var Test = artifacts.require('./Test.sol')

module.exports = function(deployer) {
  // deployer.deploy(Migrations);
  deployer.deploy(AssetBase)
  deployer.deploy(CoreDeployer)
  deployer.deploy(Test)
};
