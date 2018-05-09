var Migrations = artifacts.require("./Migrations.sol");
var Remitance = artifacts.require("./Remittance.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Remitance);
};
