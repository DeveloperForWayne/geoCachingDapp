pragma solidity >0.4.99 <0.6.0;

contract Cache {
      bytes32 coordinates;
      string name;
      address[] items;

      constructor(bytes32 _coordinates, string memory _name) public {
            coordinates = _coordinates;
            name = _name;
      }


}