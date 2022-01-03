// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./InterestRateModel.sol";

abstract contract CErc20Delegator is IERC20 {

    address public implementation;
    address public admin;
    address public pendingAdmin;
    address public interestRateModel;
    function _setPendingAdmin(address payable newPendingAdmin) external virtual returns (uint);
    function _setInterestRateModel(InterestRateModel newInterestRateModel) public virtual returns (uint);
    function _setImplementationSafe(address implementation_, bool allowResign, bytes calldata becomeImplementationData) external virtual;
    function redeemUnderlying(uint underlying) external virtual;

    function _acceptAdmin() external virtual returns (uint);
    function mint(uint mintAmount) external virtual returns (uint);
    function balanceOf(address owner) external view virtual returns (uint);
    function balanceOfUnderlying(address owner) external view virtual returns (uint);
}