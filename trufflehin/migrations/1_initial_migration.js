// var Migrations = artifacts.require("./Migrations.sol")
//var AssetBase = artifacts.require('./AssetBase.sol')
var CoreDeployer = artifacts.require('./CoreDeployer.sol')

module.exports = function(deployer) {
  // deployer.deploy(Migrations);
  //deployer.deploy(AssetBase)
  deployer.deploy(CoreDeployer)
};
