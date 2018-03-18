pragma solidity ^0.4.11;
contract AssetBase {

        event Transfer(address from,address to,uint256 tokenId);
    event AssetCreated(string,uint256,string,uint256,uint256);
    /*
    event LockCreated(address, uint256,string);
    event EventGenerationByForging(uint256[],address);
    event LicenseGiven(uint256,uint256,uint64,string,string,address);
    event LicenseRemoved(uint256,uint256);
    event LimitPlanAdded (uint256,uint256);
    event LimitPlanRemoved(uint256,uint256);
    event LicenseRateTimeAdded(uint256 ,uint256);
    event LicenseRateTimeRemoved(uint256,uint256);
    event LockUpgraded (uint lockid, uint256 increaseByValue);
    */
    // struct of lock , all locks generated would be stored over here
    struct Asset {
        string assetHash;
        uint64 creationTime;
        // 1- pdf , 2- music,3-jpeg,4-png
        uint256 assetType;
        // status means onrent, for sale , locked , unlocked and more
        // for now lets assume , 0 is the default , unlocked,unrented,notonsale
        // 2 means on sale
        // 1 means on chain
        // TODO check if this is needed
        uint256 assetStatus;
        string personalisedMessage;
    }

    uint256 public nonce;

    // this array will store all locks , we give id we get lock object , simple and sweet !
    /* Asset[] public assets; */
    mapping(uint => Asset) public assets;
    // this array will contain all the locked locks
    // this mapping will track address of owner with lockid which is basically the index of lock in the above array
    mapping(uint256 => address) public tokenIndexToOwner;
    // this mapping will give us no of locks owned by an address , we will increment this when tranfer of ownership happens
    mapping(address => uint256) ownershipTokenCount;
    // this mapping will track the owner ship approval , will be used for escrowing
    mapping (uint256 => address) public tokenIndexToApproved;
    function incrementNonce() internal {
      nonce += 1;
    }
    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;
        // transfer ownership
        tokenIndexToOwner[_tokenId] = _to;
        // When creating new locks _from is 0x0, but we can't account that address.
        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
            // clear any previously approved ownership exchange
            delete tokenIndexToApproved[_tokenId];
        }
        // Emit the transfer event.
        Transfer(_from, _to, _tokenId);
    }
    function isOwnerOf(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return tokenIndexToOwner[_tokenId] == _claimant;
    }
    function _generateAssets (
        string personalMessage,
        string hashprefix,
        uint256 _assetType
    )  returns (uint256)
    {
        Asset memory _asset = Asset(
        {
        creationTime: uint64(now),
        assetStatus: 0,
        assetHash: hashprefix,
        personalisedMessage: personalMessage,
        assetType:_assetType
        });

        /* uint256 newAssetId = assets.push(_asset) - 1;
        require(newAssetId == uint256(uint32(newAssetId))); */
        assets[nonce] = _asset;
        incrementNonce();

        // transfers newly generated locks to ceoaddress
        _transfer(0,msg.sender,nonce - 1);

        // fire event
        AssetCreated(hashprefix,nonce - 1,personalMessage,_assetType,0);

        return nonce - 1;
    }
}
