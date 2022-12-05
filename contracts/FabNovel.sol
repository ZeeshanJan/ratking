// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";
import "hardhat/console.sol";

import "./RatKingSociety.sol";
/// @custom:security-contact info@ratking.io
contract FabNovel is ERC721, ERC721Enumerable, Pausable, Ownable, ReentrancyGuard, DefaultOperatorFilterer {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    mapping(address => bool) fabMinterList;

    uint256 maxFabNovels = 100; // hard cap

    // Base URI
    string private _baseURIextended;

    
    event WithdrawBalance(uint256 balance);
    event WithdrawERC20(uint256 balance);

    RatKingSociety RK;
    address ratKingAddress;

    constructor() ERC721("FabNovel", "FabNovel") {
    }

    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function setRatKingAddress(address ratAdd) public onlyOwner {
        ratKingAddress = ratAdd;
        RK = RatKingSociety(ratKingAddress);
    }

    function checkRatMinter(address ratMinter) public view returns (bool){ //temp
        return RK.minterList(ratMinter);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mintFabNovel() public {
        require(fabMinterList[msg.sender] == false, "Already minted");
        require(_tokenIdCounter.current() < maxFabNovels, "Public Mint Limit reached" );
        require(RK.minterList(msg.sender) == true, "You are not RatKing Minter");
        safeMint(msg.sender);
        fabMinterList[msg.sender] = true;

    }


    function safeMint(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setApprovalForAll(address operator, bool approved) public override(ERC721, IERC721) onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(address operator, uint256 tokenId) public override(ERC721, IERC721) onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
        public
        override(ERC721, IERC721)
        onlyAllowedOperator(from)
    {
        super.safeTransferFrom(from, to, tokenId, data);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable) 
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
    * @notice allows owner to withdraw funds from minting
    */
    function withdraw() public onlyOwner nonReentrant {
        payable(owner()).transfer(address(this).balance);

        emit WithdrawBalance(address(this).balance);
    }

    /**
    * @notice allows owner to withdraw any ERC20 token from contract's balances
    * @param erc20TokenContract The contract address of an ERC20 token
    */
    
    function withdrawERC20(address erc20TokenContract) public onlyOwner nonReentrant{
        IERC20 tokenContract = IERC20(erc20TokenContract);
        tokenContract.transfer(msg.sender, tokenContract.balanceOf(address(this)));

        emit WithdrawERC20(address(this).balance);
    }
    
}