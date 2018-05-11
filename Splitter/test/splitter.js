'use strict';

var Splitter = artifacts.require("../contracts/Splitter.sol");
const expectThrow = require('../../util').expectThrow;

contract('Splitter', function(accounts) {
  it("Should split 2 ether between 2 accounts", async function() {
    let splitter = await Splitter.new(accounts[1], accounts[2]);
    let state = await splitter.split({value: 2000000000000000000, from: accounts[3]});

    let firstAccountBalance = web3.fromWei(web3.eth.getBalance(accounts[1]).toNumber(), 'ether');
    let secondAccountBalance = web3.fromWei(web3.eth.getBalance(accounts[2]).toNumber(), 'ether');

    assert.equal(101, firstAccountBalance, "Balance in first account is incorrect");
    assert.equal(101, secondAccountBalance, "Balance in second account is incorrect");
  });

  it("Should throw an error when sended amount is less 2 wei", async function() {
    let splitter = await Splitter.new(accounts[1], accounts[2]);
    await expectThrow(splitter.split({value: 1, from: accounts[3]}));
  });
});