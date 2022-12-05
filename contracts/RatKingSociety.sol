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
import "hardhat/console.sol"; // For testing purposes


/// @custom:security-contact info@ratking.io
contract RatKingSociety is ERC721, ERC721Enumerable, Pausable, Ownable, ReentrancyGuard, DefaultOperatorFilterer {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _publicMintCounter;
    Counters.Counter private _giftCounter;

    mapping(address => bool) public minterList;

    uint256 MAX_SUPPLY = 275; // hard cap
    uint256 maxPublicMint = 250;
    uint256 maxGifts = 25; 

    address[] listContentNFT;

    // Base URI
    string private _baseURIextended;

    event WithdrawBalance(uint256 balance);
    event WithdrawERC20(uint256 balance);

    constructor() ERC721("RatKing", "RatKing") {

    }


    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mintRatKing() public {
        require(minterList[msg.sender] == false, "Already minted");
        require(_publicMintCounter.current() < maxPublicMint, "Public Mint Limit reached" );
        safeMint(msg.sender);
        minterList[msg.sender] = true;
        _publicMintCounter.increment();

    }

    function giftRatKing(address[] memory to) public onlyOwner {

        require(to.length + _giftCounter.current() <= maxGifts, "Limit reached.");
        console.log("Gift Counter (Before): ", _giftCounter.current());
        console.log("Size of array: ", to.length);
        for(uint i=0; i<to.length; i++) {
            safeMint(to[i]);
            minterList[to[i]] = true;
            _giftCounter.increment();
        }
        console.log("Gift Counter (After): ", _giftCounter.current());
    }


    function safeMint(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function addContentNFT(address[] memory contentNFT) public onlyOwner {
        for(uint i=0; i<contentNFT.length; i++) {
            listContentNFT.push(contentNFT[i]);
        }
        
    }

    function getContentNFTList() public view returns (address[] memory) {
        return listContentNFT;
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
    
    function withdrawERC20(address erc20TokenContract) public onlyOwner nonReentrant {
        IERC20 tokenContract = IERC20(erc20TokenContract);
        tokenContract.transfer(msg.sender, tokenContract.balanceOf(address(this)));

        emit WithdrawERC20(address(this).balance);
    }
    
}