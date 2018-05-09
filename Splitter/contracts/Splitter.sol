pragma solidity ^0.4.18;

contract Splitter {
     address public _bob;
     address public _carol;
     address public _owner;
    
    function Splitter(address bobAddress, address carolAddress){
        _bob = bobAddress;
        _carol = carolAddress;
        _owner = msg.sender;
    }
    
    function split() payable public returns(bool){
        if(msg.value <= 1 ) return false;
        
        _bob.transfer(msg.value / 2);
        _carol.transfer(msg.value / 2);
        
        return true;
    }

    function getBobBalance() constant returns (uint) {
        return _bob.balance;
    }
    
    function getAliceBalance() constant returns (uint) {
        return _carol.balance;
    }
    
    function termiante() public {
        require(msg.sender == _owner);
        selfdestruct(_owner);
    }
}