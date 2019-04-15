pragma solidity >0.4.99 <0.6.0;

contract Item {

      string public name;
      address public itemOwner;
      bool public inCache;
      string  public coordinates;
     
      constructor(string memory _coordinates, string memory _name, address _itemOwner, bool _inCache) public {
            coordinates = _coordinates;
            name = _name;
            itemOwner = _itemOwner;
            inCache = _inCache;
      } 

      function putItemInCache() public {
            require(inCache == false);
            inCache = true;
      }

      function removeItemFromChache() public {     
            require(inCache == true);
            inCache = false;
      }

      function showItemSpecs() public  view returns(address,string memory, bool, string memory) {
           return (itemOwner, name, inCache, coordinates);
      }

      function setName(string memory _name) public {
            name = _name;
      }

      function setItemOwner(address _newOwner) public {
            itemOwner = _newOwner;
      }

      function setCoordinates(string  memory _coordinates) public {
            coordinates = _coordinates;
      }

    
}