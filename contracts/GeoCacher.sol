pragma solidity >0.4.99 <0.6.0;

contract GeoCacher  {

    address public owner;
    string public name;
    address[] bag;

    constructor(string memory _name) public {
        name = _name;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function claimOwnershipOfItem(address item) public onlyOwner {
        bag.push(address(item));
    }

    function getBagItems() public view returns (address[] memory) {
        return bag;
    }
    
}