/// this contains all the variables for making sibling contracts that will be deployed individually 
/// and this is the starting point of smart contracts
pragma solidity ^0.4.16;
import "./Ownership.sol";
contract Core is Ownership {
    function Core() {
        // Starts paused.
        //TODO see what to put here 
        
    }
}