pragma solidity >0.4.99 <0.6.0;

contract Cache {
      bytes32 coordinates;
      string name;
      address[] items;

      mapping(address => uint) indexOfItem;

      // constructor(bytes32 _coordinates, string memory _name) public {
      //       coordinates = _coordinates;
      //       name = _name;
      // }

      function addItem(address _item) public returns(bool) {
            items.push(_item);
            return true;
      }

      function removeItem(address _item) public returns(bool){
            uint index = indexOfItem[_item];
            if (items.length > 1) {
                  items[index] = items[items.length-1];
            }
            items.length--;
            return true;
      } 

      function listItems() public returns(address) {
            for (uint j = 0; j<items.length; j++) {
            return items[j];
        }
      }


}