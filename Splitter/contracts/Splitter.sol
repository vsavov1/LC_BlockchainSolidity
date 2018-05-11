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
        require(msg.value >= 2 );
        
        if(msg.value % 2 != 0)
        {
            msg.sender.transfer(1);
        }
        
        _bob.transfer(msg.value / 2);
        _carol.transfer(msg.value / 2);
        
        return true;
    }
    
    function termiante() public {
        require(msg.sender == _owner);
        selfdestruct(_owner);
    }
}