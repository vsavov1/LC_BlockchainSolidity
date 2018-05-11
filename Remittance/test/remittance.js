'use strict';

var Remittance = artifacts.require("../contracts/Remittance.sol");
const expectThrow = require('../../util').expectThrow;

contract('Remittance', function(accounts) {
  it("Should transfer ethers successfully", async function() {
    let remittance = await Remittance.new();
    await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});
    await remittance.claim("qwe", "qwe", accounts[4], {from: accounts[2]});
    let recipientAccountBalance = web3.eth.getBalance(accounts[4]).toNumber();
    assert.equal(105000000000000000000, recipientAccountBalance, "Balance in second account is incorrect");
  });

  it("Should throw an error when wrong password is passed", async function() {
      let remittance = await Remittance.new();
      await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});
      await expectThrow(remittance.claim("wrong", "password", accounts[4], {from: accounts[3]}));
  });

  it("Should throw an error when there are to two orders with same password", async function() {
      let remittance = await Remittance.new();
      await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});
      await expectThrow(remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]}));
  });

  it("Should throw an error when password is empty", async function() {
      let remittance = await Remittance.new();
      await expectThrow(remittance.sendRemittance("", accounts[2], {value: 5000000000000000000, from: accounts[1]}));
  });

  it("Should throw an error when sended eth is zero", async function() {
      let remittance = await Remittance.new();
      await expectThrow(remittance.sendRemittance("", accounts[2], {value: 0, from: accounts[1]}));
  });

  it("Should throw an error when sender is not recipient", async function() {
      let remittance = await Remittance.new();
      await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});
      
      await expectThrow(remittance.claim("wrong", "password", accounts[4], {from: accounts[3]}));
  });

  it("Should cancel remittance successfully", async function() {
      let remittance = await Remittance.new();
      await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});

      let result = await remittance.cancelRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c",
      {from: accounts[1]});

      let transactionValue = web3.eth.getTransaction(result.tx).value.toNumber();
      assert.equal(0,transactionValue);
  });

  it("Should throw an error on cancel remittance when sender is not owner", async function() {
      let remittance = await Remittance.new();
      await remittance.sendRemittance("0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", 
      accounts[2], {value: 5000000000000000000, from: accounts[1]});
      
      await expectThrow(await remittance.cancelRemittance(
      "0xe7439e8ccb9bea985174b5a84fe037b72aeebb9b70dbb17c21a0e58f5658c56c", {from: accounts[3]}));
  });
});