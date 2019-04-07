pragma solidity >0.4.99 <0.6.0;

// interface StateStorage { 
//     function getAddress(bytes32 key) external returns (address);
//     function getAddressArray(bytes32 key) external returns (address[] memory);
//     function getUint(bytes32 key) external returns (uint);
//     function getBool(bytes32 key) external returns (bool);
//     function getBytes32(bytes32 key) external returns (bytes32);
//     function getString(bytes32 key) external returns (string memory);
//     function setAddressArray(bytes32 key, address[] calldata value) external;
//     function updateAddressArray(bytes32 key, address  value) external;
//     function setAddress(bytes32 key, address value) external;
//     function setUint(bytes32 key, uint value) external;
//     function setBool(bytes32 key, bool value) external;
//     function setBytes32(bytes32 key, bytes32 value) external;
//     function setString(bytes32 key, string calldata value) external;
// }

contract Item {

      // StateStorage public _stateStorage;
      string public name;
      address public itemOwner;
      bool public inCache;
      bytes32  public coordinates;
     
      // constructor(StateStorage stateStorage) public {
      //       _stateStorage = stateStorage;
      // }
      
      function putItemInCache() public {
            require(inCache == false);
            inCache = true;
      }

      function removeItemFromChache() public {     
            require(inCache == true);
            inCache = false;
      }

      function showItemSpecs() public  view returns(address,string memory, bool, bytes32) {
           return (itemOwner, name, inCache, coordinates);
      }

      function setName(string memory _name) public returns(bool){
            name = _name;
            return true;
      }

      function setItemOwner(address _newOwner) public returns(bool) {
            itemOwner = _newOwner;
            return true;
      }

      function setCoordinates(bytes32 _coordinates) public returns(bool){
            coordinates = _coordinates;
            return true;
      }

    
}