// this contract will have all the functions required to track ownership of the 721 , this will not change ever
pragma solidity ^0.4.11;

import "./AssetBase.sol";
import "./ERC721.sol";

contract Ownership is AssetBase , ERC721 {

    string public  name ;
    string public  symbol ;



    function Ownership(string _name,string _symbol) public {
        name=_name;
        symbol=_symbol;
        Asset memory _asset = Asset(
        {
        creationTime: uint64(now),
        assetStatus: 0,
        assetHash: "",
        personalisedMessage: "",
        assetType:0
        });


        assets[nonce] = _asset;
        incrementNonce();
        _transfer(0,msg.sender, nonce-1);

        /* uint256 newAssetId = assets.push(_asset) - 1; */
        // transfers newly generated locks to ceoaddress
        /* _transfer(0,msg.sender, newAssetId); */

        // fire event
        AssetCreated(_asset.assetHash, nonce-1,_asset.personalisedMessage,0,0);

    }
    /**events*/
    event Approval(address from, address to, uint256 _tokenId);



    bytes4 constant InterfaceSignature_ERC165 =
        bytes4(keccak256("supportsInterface(bytes4)"));

    bytes4 constant InterfaceSignature_ERC721 =
        bytes4(keccak256("name()")) ^
        bytes4(keccak256("symbol()")) ^
        bytes4(keccak256("totalSupply()")) ^
        bytes4(keccak256("balanceOf(address)")) ^
        bytes4(keccak256("ownerOf(uint256)")) ^
        bytes4(keccak256("approve(address,uint256)")) ^
        bytes4(keccak256("transfer(address,uint256)")) ^
        bytes4(keccak256("transferFrom(address,address,uint256)")) ^
        bytes4(keccak256("tokensOfOwner(address)")) ;

    function supportsInterface(bytes4 _interfaceID) external view returns (bool) {
        // DEBUG ONLY
        //require((InterfaceSignature_ERC165 == 0x01ffc9a7) && (InterfaceSignature_ERC721 == 0x9a20483d));

        return ((_interfaceID == InterfaceSignature_ERC165) || (_interfaceID == InterfaceSignature_ERC721));
    }

    // Internal utility functions: These functions all assume that their input arguments
    // are valid. We leave it to public methods to sanitize their inputs and follow
    // the required logic.

    /// @dev Checks if a given address is the current owner of a particular Lock.
    /// @param _claimant the address we are validating against.
    /// @param _tokenId lock id, only valid when > 0
    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return tokenIndexToOwner[_tokenId] == _claimant;
    }

    /// @dev Checks if a given address currently has transferApproval for a particular lock.
    /// @param _claimant the address we are confirming lock is approved for.
    /// @param _tokenId lock id, only valid when > 0
    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return tokenIndexToApproved[_tokenId] == _claimant;
    }

    /// @dev Marks an address as being approved for transferFrom(), overwriting any previous
    ///  approval. Setting _approved to address(0) clears all transfer approval.
    function _approve(uint256 _tokenId, address _approved) internal {
        tokenIndexToApproved[_tokenId] = _approved;
    }
    /// @notice Returns the number of locks owned by a specific address.
    /// @param _owner The owner address to check.
    /// @dev Required for ERC-721 compliance
    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipTokenCount[_owner];
    }
    /// @param _to The address of the recipient, can be a user or contract.
    /// @param _tokenId The ID of the lock to transfer.
    /// @dev Required for ERC-721 compliance.

    /// vaibhav`s interpretation
    /// this is for peer to peer transfer of kitties , you can only send your cat
    function transfer(
        address _to,
        uint256 _tokenId
    )external
    {
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0));
        // Disallow transfers to this contract to prevent accidental misuse.
        // The contract should never own any kitties (except very briefly
        // after a gen0 cat is created and before it goes on auction).
        require(_to != address(this));
        // You can only send your own cat.
        require(_owns(msg.sender, _tokenId));
        // Reassign ownership, clear pending approvals, emit Transfer event.
        _transfer(msg.sender, _to, _tokenId);
    }
    /// @notice Grant another address the right to transfer a specific lock via
    ///  transferFrom(). This is the preferred flow for transfering NFTs to contracts.
    /// @param _to The address to be granted transfer approval. Pass address(0) to
    ///  clear all approvals.
    /// @param _tokenId The ID of the lock that can be transferred if this call succeeds.
    /// @dev Required for ERC-721 compliance.
    function approve(
        address _to,
        uint256 _tokenId
    )   external
    {
        // Only an owner can grant transfer approval.
        require(_owns(msg.sender, _tokenId));

        // Register the approval (replacing any previous approval).
        _approve(_tokenId, _to);

        // Emit approval event.
        Approval(msg.sender, _to, _tokenId);
    }

    /// @notice Transfer a lock owned by another address, for which the calling address
    ///  has previously been granted transfer approval by the owner.
    /// @param _from The address that owns the lock to be transfered.
    /// @param _to The address that should take ownership of the lock. Can be any address,
    ///  including the caller.
    /// @param _tokenId The ID of the lock to be transferred.
    /// @dev Required for ERC-721 compliance.

    /// vaibhav`s interpretation
    /// checks if the person calling the function has the approval ,
    /// checks if the _from owns the lock
    /// transfer
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    )external
    {
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0));
        // Disallow transfers to this contract to prevent accidental misuse.
        // The contract should never own any kitties (except very briefly
        // after a gen0 cat is created and before it goes on auction).
        require(_to != address(this));
        // Check for approval and valid ownership
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));

        // Reassign ownership (also clears pending approvals and emits Transfer event).
        _transfer(_from, _to, _tokenId);
    }
    /// @notice Returns the total number of locks currently in existence.
    /// @dev Required for ERC-721 compliance.
    function totalSupply() public view returns (uint) {
        return nonce;
    }

    /// @notice Returns the address currently assigned ownership of a given lock.
    /// @dev Required for ERC-721 compliance.
    function ownerOf(uint256 _tokenId)
        external
        view
        returns (address owner)
    {
        owner = tokenIndexToOwner[_tokenId];

        require(owner != address(0));
    }
    /// @notice Returns a list of all lock IDs assigned to an address.
    /// @param _owner The owner whose tokens we are interested in.
    /// @dev This method MUST NEVER be called by smart contract code. First, it's fairly
    ///  expensive (it walks the entire lock array looking for cats belonging to owner),
    ///  but it also returns a dynamic array, which is only supported for web3 calls, and
    ///  not contract-to-contract calls.
    function tokensOfOwner(address _owner) external view returns(uint256[] ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalLocks = totalSupply();
            uint256 resultIndex = 0;

            // We count on the fact that all cats have IDs starting at 1 and increasing
            // sequentially up to the totalCat count.
            uint256 lockId;

            for (lockId = 1; lockId <= totalLocks; lockId++) {
                if (tokenIndexToOwner[lockId] == _owner) {
                    result[resultIndex] = lockId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

}
