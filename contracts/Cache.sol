pragma solidity >0.4.99 <0.6.0;

contract Cache {
      
            string public name;
            address[] public items;
            string public lat;
            string public lng;
            mapping(address => uint) indexOfItem;

        

      constructor (string memory _lat, string memory _lng , string memory _name) public {
            name = _name;
            lat = _lat;
            lng = _lng;     
      }

      function addItem(address _item) public {
            items.push(_item);
      }

    //   function isItemInCache(address _item) public view returns(bool) {
    //         if(caches[_coordinates].items.length == 0) return false;
    //         return caches[_coordinates].items[caches[_coordinates].itemPointers[_item]] == _item;
    //   }

   function removeItem(address _item) public returns(bool){
            uint index = indexOfItem[_item];
            if (items.length > 1) {
                  items[index] = items[items.length-1];
            }
            items.length--;
            return true;
      } 

      function getCacheName() public  view returns(string memory) {
           return name;
      }

      function listItems() public view returns(address[] memory) {
           address[] memory resAddr;
            for (uint j = 0; j<1000; j++) {
                resAddr[j] = items[j];
            return resAddr;
        }
      }

}