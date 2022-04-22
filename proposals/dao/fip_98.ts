import { ethers } from 'hardhat';
import { expect } from 'chai';
import {
  DeployUpgradeFunc,
  NamedAddresses,
  SetupUpgradeFunc,
  TeardownUpgradeFunc,
  ValidateUpgradeFunc
} from '@custom-types/types';
import { getImpersonatedSigner } from '@test/helpers';

/*

DAO Proposal 98

Description:

Steps:
1. Mint 10.17m FEI into the timelock
2. Approve OTC escrow contract to spend 10.17m FEI
3. Call swap on the escrow contract to send the 10.17m FEI
  to the VOLT PCV Deposit so that the funds do not get invested into fuse

*/

const fipNumber = '98';
const seedAmount = ethers.constants.WeiPerEther.mul(10_000_000); // 10 M

// Do any deployments
// This should exclusively include new contract deployments
const deploy: DeployUpgradeFunc = async (deployAddress: string, addresses: NamedAddresses, logging: boolean) => {
  return {}; // empty return to silence typescript compiler error
};

// Do any setup necessary for running the test.
// This could include setting up Hardhat to impersonate accounts,
// ensuring contracts have a specific state, etc.
const setup: SetupUpgradeFunc = async (addresses, oldContracts, contracts, logging) => {};

// Tears down any changes made in setup() that need to be
// cleaned up before doing any validation checks.
const teardown: TeardownUpgradeFunc = async (addresses, oldContracts, contracts, logging) => {
  console.log(`No actions to complete in teardown for fip${fipNumber}`);
};

// Run any validations required on the fip using mocha or console logging
// IE check balances, check state of contracts, etc.
const validate: ValidateUpgradeFunc = async (addresses, oldContracts, contracts, logging) => {
  const { feiDAOTimelock, fei, volt, voltFusePCVDeposit } = contracts;

  const feiAmount = ethers.constants.WeiPerEther.mul(10_170_000); // 10.17 M
  // Validate 10M volt was received by fei Dao timelock
  // Validate 10.17M fei was received by volt fuse pcv deposit
  expect(await volt.balanceOf(feiDAOTimelock.address)).to.be.equal(seedAmount);
  expect(await fei.balanceOf(voltFusePCVDeposit.address)).to.be.equal(feiAmount);
};

export { deploy, setup, teardown, validate };
