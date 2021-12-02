import { ProposalDescription } from '@custom-types/types';

const fip_38: ProposalDescription = {
  title: 'FIP-38: Tokemak Reactor and Swap',
  commands: [
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

Proposal:
A TRIBE reactor on Tokemak will improve liquidity for TRIBE trading pairs across trading venues and open up additional opportunities to leverage Tokemak with the aim of including FEI as a base asset when the Toke Community diversifies from centralized stablecoin base assets.
To initialize a TRIBE reactor, Tokemak requires an operational reserve of TRIBE to efficiently deploy TRIBE liquidity to trading venues (Uniswap, SushiSwap, 0x, Balancer) and make TRIBE LPs on Tokemak benefit from IL mitigation. This can be structured as follows:
The Fei DAO to make 6M TRIBE available to the Tokemak reactor reserve by proceeding with a DAO-to-DAO trade for equivalent value in TOKE.
After receiving TOKE, this will be staked single-sided to earn additional TOKE.
This part of the proposal can be completed by Optimistic Approval through the timelock.
In the meantime, 10k ETH will also be staked single-sided to earn additional TOKE, this ETH will come from Aave and Compound.
A future proposal can determine whether to LP with the TOKE for a higher APR, and whether to supply additional TRIBE for liquidity.
Snapshot: https://snapshot.fei.money/#/proposal/0x9bf4cd1d36597d27303caaefc9c27f3df3cc4939dcf8a4c8ea64b0f528245294
Forum discussion: https://tribe.fei.money/t/fip-38-tokemak-tribe-reactor-treasury-swap/3580
Code: https://github.com/fei-protocol/fei-protocol-core/pull/283
`
};

export default fip_38;
