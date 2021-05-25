// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
 
import "./IPCVDeposit.sol"; 
import "../refs/CoreRef.sol";
import "../utils/Timed.sol";

/// @title a PCV dripper
/// @author Fei Protocol
contract EthPCVDripper is CoreRef, Timed, IPCVDeposit {
   using Address for address payable;
 
   /// @notice target address to drip to
   address payable public target;

   /// @notice amount to drip after each window
   uint256 public amountToDrip;

   event Dripped(uint256 amount);
   event Withdrawal(address indexed to, uint256 amount);

   /// @notice ETH PCV Dripper constructor
   /// @param _core Fei Core for reference
   /// @param _target address to drip to
   /// @param _frequency frequency of dripping
   /// @param _amountToDrip amount to drip on each drip
   constructor(
       address _core,
       address payable _target,
       uint256 _frequency,
       uint256 _amountToDrip
   ) public CoreRef(_core) Timed(_frequency) {
       target = _target;
       amountToDrip = _amountToDrip;

        // start timer
       _initTimed();
   }
 
   receive() external payable {}
 
   /// @notice withdraw ETH from the PCV dripper
   /// @param amount of tokens withdrawn
   /// @param to the address to send PCV to
   function withdraw(address to, uint256 amount)
       external
       override
       onlyPCVController
   {
       payable(to).sendValue(amount);
       emit Withdrawal(to, amount);
   }
 
   /// @notice new PCV deposited to the dripper
   /// @dev no-op because the ETH transfer already happened
   function deposit() external override {}

   /// @notice drip ETH to target
   function drip()
       external
       afterTime
       whenNotPaused
   {
       require(isTargetBalanceLow(), "EthPCVDripper: target balance too high");

       // reset timer
       _initTimed();

       // drip
       target.sendValue(amountToDrip);
       emit Dripped(amountToDrip);
   }

    function balance() public view override returns (uint256) {
        return address(this).balance;
    }

   /// @notice checks whether the target balance is less than the drip amount
   function isTargetBalanceLow() public view returns(bool) {
       return target.balance < amountToDrip;
   }
}