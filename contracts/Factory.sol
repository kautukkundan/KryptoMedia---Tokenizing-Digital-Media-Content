pragma solidity ^0.4.18;

import "./Ownership.sol";
contract Core is Ownership {
    function Core(string name,string symbol) Ownership(name,symbol) public {
        // Starts paused
    }
}

contract Deployer {

    address owner;
    address[] public cores;

    function Deployer() public{
        owner = msg.sender;
    }
    function createCore(string name,string symbol) public returns(Core){
        Core core = new Core(name,symbol);
        cores.push(core);
        return core;
    }
}
