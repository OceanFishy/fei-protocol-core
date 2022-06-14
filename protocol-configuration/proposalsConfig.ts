import { ProposalCategory, TemplatedProposalsConfigMap } from '@custom-types/types';
import repay_fuse_bad_debt from '@proposals/description/repay_fuse_bad_debt';
import tokemak_withdraw from '@proposals/description/tokemak_withdraw';
import eth_lbp from '@proposals/description/eth_lbp';
import clawback from '@proposals/description/clawback';
import tip_111 from '@proposals/description/tip_111';

const proposals: TemplatedProposalsConfigMap = {
  tip_111: {
    deploy: true, // deploy flag for whether to run deploy action during e2e tests or use mainnet state
    totalValue: 0, // amount of ETH to send to DAO execution
    proposal: tip_111, // full proposal file, imported from '@proposals/description/fip_xx.ts'
    proposalId: '',
    affectedContractSignoff: [
      /*'dpiToDaiLBPSwapper',
      'compoundDaiPCVDeposit',
      'tribalCouncilSafe',
      'ratioPCVControllerV2'*/
    ],
    deprecatedContractSignoff: [],
    category: ProposalCategory.DAO
  },
  repay_fuse_bad_debt: {
    deploy: false, // deploy flag for whether to run deploy action during e2e tests or use mainnet state
    totalValue: 0, // amount of ETH to send to DAO execution
    proposal: repay_fuse_bad_debt, // full proposal file, imported from '@proposals/description/fip_xx.ts'
    proposalId: '',
    affectedContractSignoff: ['core', 'fuseFixer', 'pcvGuardianNew'],
    deprecatedContractSignoff: [],
    category: ProposalCategory.DAO
  }
};

export default proposals;
