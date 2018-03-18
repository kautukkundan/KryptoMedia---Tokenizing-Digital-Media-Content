 pragma solidity ^0.4.11;
import "./Ownership.sol";
contract buySellAssets is Ownership {
    /** events */
    event SellOrderCreated(uint256,uint256,address);
    event SellOrderCancelled(uint256);
    event SellOrderFulFilled(uint256,uint256,address,address);
    
    
    struct SellOrder {
        address seller ;
        uint256 sellingPrice;
        // status can be 0=inactive or cancelled , 1 = posted and active , 2= posted and fulfilled
        uint8 status;
        uint asset_id;
    }

    /*** Storage**/
    mapping(uint256 => SellOrder) public tokenIdToSellOrder;
    
    function _isOnSale(uint256 _tokenId) internal view returns(bool) {
        return (tokenIdToSellOrder[_tokenId].status == 1);
    }
    function _removeSellOrder(uint256 _tokenId) internal {
        // SellOrderCancelled(tokenIdToSellOrder[_tokenId],_tokenId);
        delete tokenIdToSellOrder[_tokenId];
    }
    

    // fetch the lock , check owner is the msg.sender , change lockstatus to onsale 
    // will be called by owner of lock
    // check if or front end will call this or contract 
    function createSellOrder(uint256 price, uint256 _asset_id ) external   {
        // add require statements to validate input 
        // checks if the owner is msg.sender , only the owner can put sell order 
        require(_owns(msg.sender, _asset_id));
        uint256 value = price * 1 wei;
        
        // TODO check if lock with this tokenid exists
        Asset storage sellingAsset = assets[_asset_id];
        require(sellingAsset.assetStatus == 0);
        //TODO is this needed 
        sellingAsset.assetStatus = 2;

        SellOrder memory _sellorder = SellOrder({
            seller: msg.sender,
            sellingPrice: value,
            asset_id: _asset_id,
            status: 1
        });
        
        tokenIdToSellOrder[_asset_id] = _sellorder;
        //checks overflow
        //emit sell event
        SellOrderCreated(_asset_id,value,msg.sender);
        
    }
    // checks if the sender is owner of lock , checks if the lock is on sale 
    function cancelSellOrder(uint256 token_id) public  {
        // check if the msg.sender owns the lock
    //     require(_owns(msg.sender,token_id));
    //     //check if the lock is on sale
    //     require(_isOnSale(token_id));
    //     Lock storage sellingLock = locks[token_id];
	   // sellingLock.lockStatus = 0;
    //     // remove the lock sell order
    //     _removeSellOrder(token_id);
        SellOrderCancelled(token_id);
    }

    function buySellOrder(uint256 asset_id ) external payable {
        // check if the given lock is on sale
        require(_isOnSale(asset_id));
        
        // change status of lock to defaut
        Asset storage sellingAsset = assets[asset_id];
        sellingAsset.assetStatus = 0;
        // fetch seller and price before deleting
        address seller_address = tokenIdToSellOrder[asset_id].seller;  
        uint256 selling_price = tokenIdToSellOrder[asset_id].sellingPrice * 1 wei;
        require(selling_price <= msg.value);

        seller_address.transfer(selling_price);
        // remove sell order to prevent reentrancy attack
        _removeSellOrder(asset_id);
        
        require(_approvedFor(this, asset_id));
        require(_owns(seller_address, asset_id)); 

        // Reassign ownership (also clears pending approvals and emits Transfer event).
        _transfer(seller_address, msg.sender ,asset_id);        
        SellOrderFulFilled(asset_id,selling_price,seller_address,msg.sender);

    }
}