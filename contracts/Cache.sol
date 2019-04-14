pragma solidity >0.4.99 <0.6.0;

contract Cache {
      struct cache {
            bytes name;
            address[] items;
      }

      mapping (bytes => cache) caches;

      function createCache(bytes memory _coordinates, bytes memory _name) public {
            caches[_coordinates].name = _name;
      }

      function addItem(bytes memory _coordinates, address _item) public {
            caches[_coordinates].items.push(_item);
      }

      function removeItem(bytes memory _coordinates, address _item) public returns(address[] memory) {
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

      function getCacheName(bytes memory _coordinates) public  view returns(bytes memory) {
           return caches[_coordinates].name;
      }

      function getCacheItems(bytes memory _coordinates) public  view returns(address[] memory) {
           return caches[_coordinates].items;
      }

}