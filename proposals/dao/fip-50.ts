import { ProposalDescription } from '@custom-types/types';

const fip_xx: ProposalDescription = {
  title: 'FIP-50: Fei Interest Shift for Huge Yield',
  commands: [
//stETH
    //AAVE - ETH
    {
      target: 'aaveEthPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{aaveEthPCVDeposit}', '12500000000000000000000'], //add value
      description: 'Withdraw X WETH from Aave to self'
    },
    {
      target: 'aaveEthPCVDeposit',
      values: '0',
      method: 'withdrawETH(address,uint256)',
      arguments: ['{ethLidoPCVDeposit}', '12500000000000000000000'], //add value
      description: 'Unwrap X WETH from aaveEthPCVDeposit and send ETH to Lido stETH deposit'
    },
    //Compound - ETH
    {
      target: 'compoundEthPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{ethLidoPCVDeposit}', '12500000000000000000000'], //add value
      description: 'Withdraw X ETH from Compound deposit to Lido stETH deposit'
    },
     //Lido Deposit
    {
      target: 'ethLidoPCVDeposit',
      values: '0',
      method: 'deposit()',
      arguments: [],
      description: 'Deposit ETH in Lido stETH'
    },
    //Compound ETH for TOKE-ETH
    {
      target: 'compoundEthPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{}', ''], //add destination and value
      description: 'Withdraw X ETH from Compound deposit to TOKE-ETH hold for mint'
    },
//RAI/DAI
    //Compound - DAI
    {
      target: 'compoundDaiPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{}', ''], //add destination and value
      description: 'Withdraw DAI from Compound deposit to '
    },
    //AAVE - RAI
    {
      target: 'aaveRaiPCVDeposit',
      values: '0',
      method: 'withdraw(address,uint256)',
      arguments: ['{}', ''], //add destination and value
      description: 'Withdraw RAI from Aave to '
    },
  ],
  description: `

Summary:
Shift 100M USD of ETH from Compound and AAVE PCV Deposits to stETH, all TOKE + equivalent ETH to TOKE-ETH Uniswap Pool, all LUSD to the LUSD stability pool, all RAI + equivalent DAI to Uni v3 LP, and burn all FEI in Kashi.

Proposal:
Shift 100M USD of ETH from Compound and AAVE PCV Deposits to stETH, all TOKE + equivalent ETH to TOKE-ETH Uniswap Pool, all LUSD to the LUSD stability pool, all RAI + equivalent DAI to Uni v3 LP, and burn all FEI in Kashi.
The Curve stETH-ETH pair has 5B worth of liquidity. stETH is a highly liquid asset, and appropriate to add to the treasury. Currently the entire recommended stETH allocation can be sold with <0.08% slippage.
The TOKE-ETH pool on Uniswap is a better strategy decision than single-sided TOKE, as it forces pairing with ETH and has a far higher APY of 160%.
Single-sided TOKE is actually at risk as in later Tokemak versions it will be used for TOKE-voted pairings, which are riskier than the TOKE-ETH pairing.
We propose to shift our TOKE rewards as well as an equivalent amount of ETH to TOKE-ETH, and slowly phase out the single sided ETH pool.
Moving 90M LUSD to the stability pool grants 13% APY. The stability pool is extremely safe, and grants a high level of yield to our LUSD funds.
Moving 10M LUSD to Fuse Pool 7 allows us to start an LUSD lending market for Fuse, and this also synergizes well with the upcoming Stability Pool + Fuse Product.
The RAI/DAI Uni v3 LP is incentivized by Reflexer Labs with 48% APY. Due to being a stablecoin pair, there is little to no risk of capital loss. The pool offers a far higher APY than Compound DAI deposits.
Lending deployments on Sushiswap’s Kashi makes less than 1.5k per year currently, lower than the capital risk of deploying 8m on a third-party smart contract. Burning the FEI on Kashi eliminates this smart contract risk, with little profit lost.

Snapshot: https://snapshot.fei.money/#/proposal/0x467f0ebc28b50ef9bc760e05e6150cc221806c2d73bb58232fb558eca638f754
Forum discussion: https://tribe.fei.money/t/fip-xx-fei-interest-shift-for-huge-yield/3750
Code:
`
};

export default fip_50;
