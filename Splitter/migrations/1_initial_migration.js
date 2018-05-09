var Migrations = artifacts.require("./Migrations.sol");
var Splitter = artifacts.require("./Splitter.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Splitter, "0xbf235cf8a63bff04e4125f50286eb0618898a509","0xfc40446fdd3c19526c123e8154ccce5aa5dab935");
};
