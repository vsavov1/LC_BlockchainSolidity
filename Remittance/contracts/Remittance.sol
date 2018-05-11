pragma solidity ^0.4.18;

contract Remittance {
    mapping (address => uint256) public localCurrencyBalances;
    mapping(bytes32 => Order) public orders;
    uint256 totalTokens;  
    uint256 tokenExchangeRate = 10000000000000000;
     
    struct Order {
        address owner;
        address recipient;
        uint amount;
        bytes32 pass;
    }
    
    function Remittance() {
        localCurrencyBalances[msg.sender] = 10000; 
        totalTokens = 10000;
    } 
   
    function sendRemittance(bytes32 password, address recipient) public payable  returns (bool)
    {
        require(password != 0);
        require(msg.value > 0);
        require(orders[password].pass == bytes32(0x0));
        
        orders[password] = Order({
            owner: msg.sender,
            recipient: recipient,
            amount: msg.value,
            pass: password
        });

        return true;
    }
  
    function claim(string emailPassword, string smsPassword, address recipient) public returns (bool)
    {
        bytes32 key = keccak256(emailPassword, smsPassword);
        Order storage order = orders[key];
        
        require(key == order.pass);
        require(order.recipient == msg.sender);
        
        recipient.transfer(order.amount);
        localCurrencyBalances[order.recipient] += order.amount / tokenExchangeRate;
        delete orders[key];
        
        return true;
    }
    
    function cancelRemittance(bytes32 password) public returns (bool)
    {
        Order storage order = orders[password];
        require(msg.sender == order.owner);
        msg.sender.transfer(order.amount); 
        delete orders[password];

        return true;
    }
}