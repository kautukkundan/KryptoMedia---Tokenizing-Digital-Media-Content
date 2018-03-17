pragma solidity ^0.4.18;

import "./Ownership.sol";
contract Core is Ownership {
    function Core(string name,string symbol) Ownership(name,symbol) public {
        // Starts paused
    }
}

contract Deployer {

    address owner;
    mapping(string=>address)  cores;
    function getAddressFromCores(string keyvalue) constant returns (address){
        return cores[keyvalue];
    }
    function Deployer() public{
        owner = msg.sender;
    }
    function createCore(string name,string symbol) public returns(Core){
        Core core = new Core(name,symbol);
        cores[symbol]=core;
        return core;
    }
}
