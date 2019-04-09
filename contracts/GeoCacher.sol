pragma solidity >0.4.99 <0.6.0;

contract Cache {
    function coordinates() public pure returns(bytes32 );
    function name() public pure returns(string memory);
    function items() public pure returns(address[] memory);
    function addItem(address) public returns(bool);
    function removeItem(address) public returns(bool);
}

contract Item {

    function name() public pure returns (string memory);
    function itemOwner() public pure returns(address);
    function inCache() public pure returns (bool);
    function coordinates() public pure returns (bytes32);
    function cacheCoordinates() public pure returns(bytes32);
    function putItemInCache() public;
    function removeItemFromCache() public;
    function showItemSpecs() public returns(address, string memory, bool, bytes32);
    function setItemOwner(address) public returns(bool);
    function setCoordinates(bytes32) public returns(bool);
    function setCacheCoordinates(bytes32) public returns(bool);
    }   

contract GeoCacher  {

    address public owner;
    address[] bag;
    mapping(address => uint) indexOfItem;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function createItem(bytes memory code, uint256 salt) public  returns (address){
        address addr;
        assembly {
            addr := create2(0, add(code, 0x20), mload(code), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        return addr;
    }

    function setTheBag() private {
        address[] memory someBag;
    }
    
    function claimOwnershipOfItem(Item _item, Cache _cache) public onlyOwner returns(bool){
       _item.setItemOwner(owner);
        bag.push(address(_item));
        _cache.removeItem(address(_cache));
    }

    function listChacherItems() public view  onlyOwner  returns ( address[] memory ){
        uint counter = 0;
        for (uint j = 0; j<bag.length; j++) {
            counter++;
        }
        address[] memory b = new address[](counter);
        uint counter2 = 0;
        for (uint i = 0; i<bag.length; i++) {
            b[counter2] = bag[i];
            counter2++;
        }
        return b;
    }

    function showItemInfo(Item  _item) public  view returns (address, string memory, bool, bytes32){
        _item.showItemSpecs;
    }

    function placeItemInCache(Item _item, Cache _cache) public onlyOwner returns(bool) {
        _item.putItemInCache();
        _cache.addItem(address(_item));
        uint index = indexOfItem[address(_item)];
            if (bag.length > 1) {
                  bag[index] = bag[bag.length-1];
            }
            bag.length--; // Implicitly recovers gas from last element storag 
            return true;
      } 
        
            
      
    
    

    function eliminateItemFromCache(Item _item, Cache _cache) public onlyOwner returns (bool) {
        _item.removeItemFromCache();
        _cache.removeItem(address(_item));
        uint index = indexOfItem[address(_item)];
            if (bag.length > 1) {
                  bag[index] = bag[bag.length-1];
            }
            bag.length--; // Implicitly recovers gas from last element storag 
        return true;
    }

}