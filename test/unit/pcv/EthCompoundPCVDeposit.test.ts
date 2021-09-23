import { expectRevert, balance, getAddresses, getCore } from '../../helpers';
import { expect } from 'chai'
import hre, { ethers, artifacts } from 'hardhat'
import { Signer } from 'ethers'
    
const EthCompoundPCVDeposit = artifacts.readArtifactSync('EthCompoundPCVDeposit');
const MockCToken = artifacts.readArtifactSync('MockCToken');
  
describe('EthCompoundPCVDeposit', function () {
  let userAddress;
  let pcvControllerAddress;
  let governorAddress;

  let impersonatedSigners: { [key: string]: Signer } = { }

  before(async() => {
    const addresses = await getAddresses()

    // add any addresses you want to impersonate here
    const impersonatedAddresses = [
      addresses.userAddress,
      addresses.pcvControllerAddress,
      addresses.governorAddress,
      addresses.pcvControllerAddress,
      addresses.minterAddress,
      addresses.burnerAddress,
      addresses.beneficiaryAddress1,
      addresses.beneficiaryAddress2
    ]

    for (const address of impersonatedAddresses) {
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [address]
      })

      impersonatedSigners[address] = await ethers.getSigner(address)
    }
  });
    
  beforeEach(async function () {
    ({
      userAddress,
      pcvControllerAddress,
      governorAddress
    } = await getAddresses());
  
    this.core = await getCore();

    this.cToken = await MockCToken.new(userAddress, true);
      
    this.compoundPCVDeposit = await EthCompoundPCVDeposit.new(this.core.address, this.cToken.address);

    this.depositAmount = toBN('1000000000000000000');
  });
    
  describe('Deposit', function() {
    describe('Paused', function() {
      it('reverts', async function() {
        await this.compoundPCVDeposit.pause({from: governorAddress});
        await expectRevert(this.compoundPCVDeposit.deposit(), 'Pausable: paused');
      });
    });
  
    describe('Not Paused', function() {
      beforeEach(async function() {
        await web3.eth.sendTransaction({from: userAddress, to: this.compoundPCVDeposit.address, value: this.depositAmount});
      });

      it('succeeds', async function() {
        expect(await this.compoundPCVDeposit.balance()).to.be.equal(toBN('0'));
        await this.compoundPCVDeposit.deposit();
        // Balance should increment with the new deposited cTokens underlying
        expect(await this.compoundPCVDeposit.balance()).to.be.equal(this.depositAmount);
        
        // Held balance should be 0, now invested into Compound
        expect(await balance.current(this.compoundPCVDeposit.address)).to.be.equal(toBN('0'));
      });
    });
  });

  describe('Withdraw', function() {
    describe('Paused', function() {
      it('reverts', async function() {
        await this.compoundPCVDeposit.pause({from: governorAddress});
        await expectRevert(this.compoundPCVDeposit.withdraw(userAddress, this.depositAmount, {from: pcvControllerAddress}), 'Pausable: paused');
      });
    });

    describe('Not PCVController', function() {
      it('reverts', async function() {
        await expectRevert(this.compoundPCVDeposit.withdraw(userAddress, this.depositAmount, {from: userAddress}), 'CoreRef: Caller is not a PCV controller');
      });
    });

    describe('Not Paused', function() {
      beforeEach(async function() {
        await web3.eth.sendTransaction({from: userAddress, to: this.compoundPCVDeposit.address, value: this.depositAmount});
        await this.compoundPCVDeposit.deposit();
      });

      it('succeeds', async function() {
        const userBalanceBefore = await balance.current(userAddress);
        
        // withdrawing should take balance back to 0
        expect(await this.compoundPCVDeposit.balance()).to.be.equal(this.depositAmount);
        await this.compoundPCVDeposit.withdraw(userAddress, this.depositAmount, {from: pcvControllerAddress});
        expect(await this.compoundPCVDeposit.balance()).to.be.equal(toBN('0'));
        
        const userBalanceAfter = await balance.current(userAddress);

        expect(userBalanceAfter.sub(userBalanceBefore)).to.be.equal(this.depositAmount);
      });
    });
  });

  describe('WithdrawERC20', function() {
    describe('Not PCVController', function() {
      it('reverts', async function() {
        await expectRevert(this.compoundPCVDeposit.withdrawERC20(this.cToken.address, userAddress, this.depositAmount, {from: userAddress}), 'CoreRef: Caller is not a PCV controller');
      });
    });

    describe('From PCVController', function() {
      beforeEach(async function() {
        await web3.eth.sendTransaction({from: userAddress, to: this.compoundPCVDeposit.address, value: this.depositAmount});
        await this.compoundPCVDeposit.deposit();
      });

      it('succeeds', async function() {
        expect(await this.compoundPCVDeposit.balance()).to.be.equal(this.depositAmount);
        // cToken exchange rate is 2 in the mock, so this would withdraw half of the cTokens
        await this.compoundPCVDeposit.withdrawERC20(this.cToken.address, userAddress, this.depositAmount.div(toBN('4')), {from: pcvControllerAddress});        
        
        // balance should also get cut in half
        expect(await this.compoundPCVDeposit.balance()).to.be.equal(this.depositAmount.div(toBN('2')));

        expect(await this.cToken.balanceOf(userAddress)).to.be.equal(this.depositAmount.div(toBN('4')));
      });
    });
  });
});
