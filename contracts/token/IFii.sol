pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFii is IERC20 {
    function burn(uint256 amount) external;
    function burnFrom(address account, uint256 amount) external;
    function mint(address account, uint256 amount) external;
}
