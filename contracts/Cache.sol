pragma solidity >0.4.99 <0.6.0;

contract Cache {
      struct cache {
            string name;
            address[] items;
            mapping(address => uint) itemPointers;
      }

      mapping (string => cache) caches;

      constructor (string memory _coordinates, string memory _name) public {
            caches[_coordinates].name = _name;
      }

      function addItem(string memory _coordinates, address _item) public {
            caches[_coordinates].items.push(_item);
      }

      function isCacheItem(string memory _coordinates, address _item) public view returns(bool) {
            if(caches[_coordinates].items.length == 0) return false;
            return caches[_coordinates].items[caches[_coordinates].itemPointers[_item]] == _item;
      }

      function removeItem(string memory _coordinates, address _item) public {
            cache storage c = caches[_coordinates];
            require(isCacheItem(_coordinates, _item));
            uint rowToDelete = c.itemPointers[_item];
            c.items[rowToDelete] = c.items[c.items.length-1];
            c.items.length--;
      }

      function getCacheName(string memory _coordinates) public  view returns(string memory) {
           return caches[_coordinates].name;
      }

      function getCacheItems(string memory _coordinates) public  view returns(address[] memory) {
           return caches[_coordinates].items;
      }

}