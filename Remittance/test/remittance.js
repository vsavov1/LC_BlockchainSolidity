'use strict';

var Remittance = artifacts.require("../contracts/Remittance.sol");

contract('Remittance', function(accounts) {
  it("Should transfer ethers successfully", async function() {
    let remittance = await Remittance.new();
    await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});
    await remittance.claim("qwe", "qwe", accounts[4], {from: accounts[3]});
    let recipientAccountBalance = web3.eth.getBalance(accounts[4]).toNumber();
    assert.equal(105000000000000000000, recipientAccountBalance, "Balance in second account is incorrect");
  });

  it("Should trhow an error when wrong password is passed", async function() {

    try {
      let remittance = await Remittance.new();
      await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});
      var test = await remittance.claim("wrong", "password", accounts[4], {from: accounts[3]})
    } catch(error) {
      assertJump(error);
    }
  });

  function assertJump(error) {
      assert.isAbove(error.message.search('revert'), -1, 'Rvert error must be returned');
    }
});