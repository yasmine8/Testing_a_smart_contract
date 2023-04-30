const {ethers} = require('hardhat');
const { expect } = require("chai");

describe("Yas mine NFT COLLECTION TEST", function () {
  before(async function(){
    [this.owner,this.addr1,this.addr2] = await ethers.getSigners();
  })

  it('should deploy the smart contract', async function(){
    this.team = ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"];
    this.teamShares = [70,30];
    this.baseURI = "ipfs://CID/";

    this.contract = await hre.ethers.getContractFactory("NFTisERC721A");
    this.deployedContract = await this.contract.deploy(
      this.team,
      this.teamShares,
      this.baseURI
    )
  })

  it('price should be at 0.2 ether', async function(){
    let price = await this.deployedContract.price();
    expect(price).to.equal(ethers.utils.parseEther('0.2'));
  })

  it('should not be able to change the price if not the owner', async function(){
    let price = 0;
    expect(this.deployedContract.connect(this.addr1).setPrice(price)).to.be.revertedWith('Ownable: caller is not the owner');
  })
  it('should be possible to mint 2 NFTs', async function(){
    let price = await this.deployedContract.price();
    price = price.mul(2);

    let overrides = {
      value : price
    }
    await this.deployedContract.connect(this.addr1).publicSaleMint(this.addr1.address,2,overrides)

  })
  it('totalSupply should be equal to 2', async function(){
    let totalSupply = await this.deployedContract.totalSupply();
    await expect(totalSupply).to.equal(2);

  })

  it('should release the gains', async function(){
    let balanceAddr1 = await this.addr1.getBalance();
    let balanceAddr2 = await this.addr2.getBalance();
    console.log(balanceAddr1);
    
    await this.deployedContract.releaseAll();
    
    let balanceAddr1new = await this.addr1.getBalance();
    let balanceAddr2new = await this.addr2.getBalance();

    expect(balanceAddr1new).gt(balanceAddr1);
    expect(balanceAddr2new).gt(balanceAddr2);
    console.log(balanceAddr1new);
  })
});
