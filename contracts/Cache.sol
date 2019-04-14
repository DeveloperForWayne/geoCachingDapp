pragma solidity >0.4.99 <0.6.0;

contract Cache {
      struct cache {
            string name;
            address[] items;
      }

      mapping (string => cache) caches;

      constructor (string memory _coordinates, string memory _name) public {
            caches[_coordinates].name = _name;
      }

      function addItem(string memory _coordinates, address _item) public {
            caches[_coordinates].items.push(_item);
      }

      function removeItem(string memory _coordinates, address _item) public returns(address[] memory) {
            address[] storage itemArr = caches[_coordinates].items;
            for (uint i = 0; i < itemArr.length - 1; i++) {
                  if (itemArr[i] == _item) {
                        itemArr[i] = itemArr[itemArr.length-1];
                        delete itemArr[i - 1];
                        itemArr.length--;
                  }
            }
            return itemArr;
      } 

      function getCacheName(string memory _coordinates) public  view returns(string memory) {
           return caches[_coordinates].name;
      }

      function getCacheItems(string memory _coordinates) public  view returns(address[] memory) {
           return caches[_coordinates].items;
      }

}