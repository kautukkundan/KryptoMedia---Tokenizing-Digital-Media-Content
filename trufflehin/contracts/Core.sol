pragma solidity ^0.4.18;

import "./Ownership.sol";

contract Core is Ownership {
    function Core(string name,string symbol) Ownership(name,symbol) public {
        // Starts paused
    }
}
