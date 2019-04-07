const GeoCacher = artifacts.require("GeoCacher");

module.exports = function(deployer) {
  deployer.deploy(GeoCacher);
};

const Item = artifacts.require("Item");

module.exports = function(deployer) {
  deployer.deploy(Item);
};

const Cache = artifacts.require("Cache");

module.exports = function(deployer) {
  deployer.deploy(Cache);
};