import { ProposalDescription } from '@custom-types/types';

const fip_50: ProposalDescription = {
  title: 'FIP-50: ETH Yield Improvements',
  commands: [
   //AAVE
    {
      target: 'aaveEthPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{aaveEthPCVDeposit}', '13250000000000000000000'],
      description: 'Withdraw 13250 WETH from Aave to self'
    },
    {
      target: 'aaveEthPCVDeposit',
      values: '0',
      method: 'withdrawETH(address,uint256)',
      arguments: ['{ethTokemakPCVDeposit}', '2200000000000000000000'],
      description: 'Unwrap 2200 WETH from aaveEthPCVDeposit and send 2200 ETH to Fei Tokemak contract'
    },
  {
      target: 'aaveEthPCVDeposit',
      values: '0',
      method: 'withdrawETH(address,uint256)',
      arguments: ['{ethLidoPCVDeposit}', '11050000000000000000000'],
      description: 'Unwrap 11050 WETH from aaveEthPCVDeposit and send 11050 ETH to Lido stETH deposit'
    },
  //Compound
    {
      target: 'compoundEthPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{ethTokemakPCVDeposit}', '2200000000000000000000'],
      description: 'Withdraw 2200 ETH from Compound deposit to Fei Tokemak contract'
    },
   {
      target: 'compoundEthPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{ethLidoPCVDeposit}', '11050000000000000000000'],
      description: 'Withdraw 11050 ETH from Compound deposit to Lido stETH deposit'
    },
   //Tokemak
    {
      target: 'ethTokemakPCVDeposit',
      values: '0',
      method: 'deposit()',
      arguments: [],
      description: 'Deposit 4400 ETH in Tokemak'
    },
  
  ],
  description: `
Summary:
Shift 100M USD of ETH from Compound and AAVE PCV Deposits to stETH, and 20M USD of ETH from Compound and AAVE PCV deposits to Tokemak Single Sided ETH farming.
Proposal:
ETH yield is not being appropriately managed by the PCV, and this proposal seeks to increase yield on PCV assets in a safe fashion. At current APR, this proposal grows the estimated yield of the PCV by 6.4M~ USD per year.
The Curve stETH-ETH pair has 5.5B worth of liquidity. This marks stETH as being a highly liquid asset, and appropriate to add to the treasury. Currently the entire recommended stETH allocation can be sold with 0.76% slippage.
Tokemak is a newer DeFi protocol than stETH, and the TOKE token is less liquid and more unstable than ETH/stETH. As rewards for Tokemak farming are paid in the TOKE token, I recommend a smaller allocation for Tokemak.
The farming rewards for one year can be sold for 1.8% slippage with current liquidity. As we are staking pure ETH, liquidity for the deposited token is not a concern. 
The additional TOKE also could allow the DAO to exercise more control over Tokemak, a possibly crucial DeFi primitive.
Snapshot: https://snapshot.fei.money/#/proposal/0xbf2dfc7c7bcbeae61ec3edf8bf449ff3f440b016da8c0b8be8228aa8f3fa7d05
Forum discussion: https://tribe.fei.money/t/fip-xx-eth-yield-improvements/3722
Code: https://github.com/fei-protocol/fei-protocol-core/pull/283
`
};

export default fip_50;
