pragma solidity >0.4.99 <0.6.0;
import "./Item.sol";

contract GeoCacher  {

    address public owner;
    address[] bag;

    Item _item;

    constructor(address _it) public {
        owner = msg.sender;
        _item = Item(_it);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function claimOwnershipOfItem(Item item) public onlyOwner returns(bool){
        item.setItemOwner(owner);
        bag.push(address(_item));
    }

    function getBagItems() public view returns (address[] memory) {
        return bag;
    }
    
    function removeBagItem(address item) public returns(address[] memory) {
        for (uint i = 0; i < bag.length - 1; i++) {
                if (bag[i] == item) {
                    bag[i] = bag[bag.length-1];
                    delete bag[i - 1];
                    bag.length--;
                }
        }
        return bag;
    } 

    function showItemInfo(Item item) public view returns (address, string memory, bool, bytes32){
        item.showItemSpecs();
    }

    function placeItemInCache(Item item) public onlyOwner {
        item.putItemInCache();
    }

    function eliminateItemFromCache(Item item) public onlyOwner {
        item.removeItemFromChache();
    }

}