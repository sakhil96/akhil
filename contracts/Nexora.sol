// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Nexora (NXR)
/// @notice Fixed-supply compute settlement token for planetary AI data centers.
/// @dev 10,000,000 NXR minted once at genesis. No admin mint. Region locks take
///      tokens out of the transferable balance without changing total supply.
contract Nexora {
    string public constant name = "Nexora";
    string public constant symbol = "NXR";
    uint8 public constant decimals = 18;
    uint256 public constant MAX_SUPPLY = 10_000_000 * 1e18;

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public reservedOf;
    mapping(address => mapping(bytes32 => uint256)) public reservedIn;
    mapping(address => mapping(address => uint256)) public allowance;

    uint256 public totalSupply;
    uint256 public totalReserved;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Reserved(address indexed owner, bytes32 indexed region, uint256 amount);
    event Released(address indexed owner, bytes32 indexed region, uint256 amount);

    constructor(
        address computeReserve,
        address operatorGuild,
        address treasury,
        address builders,
        address genesis
    ) {
        _mint(computeReserve, 4_000_000 * 1e18);
        _mint(operatorGuild, 2_000_000 * 1e18);
        _mint(treasury, 1_500_000 * 1e18);
        _mint(builders, 1_500_000 * 1e18);
        _mint(genesis, 1_000_000 * 1e18);
        require(totalSupply == MAX_SUPPLY, "Nexora: supply");
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed != type(uint256).max) {
            require(allowed >= amount, "Nexora: allowance");
            allowance[from][msg.sender] = allowed - amount;
        }
        _transfer(from, to, amount);
        return true;
    }

    /// @notice Lock transferable NXR into a named data-center region.
    function reserve(bytes32 region, uint256 amount) external {
        require(amount > 0, "Nexora: zero");
        require(balanceOf[msg.sender] >= amount, "Nexora: balance");
        balanceOf[msg.sender] -= amount;
        reservedOf[msg.sender] += amount;
        reservedIn[msg.sender][region] += amount;
        totalReserved += amount;
        emit Reserved(msg.sender, region, amount);
    }

    /// @notice Unlock NXR from a region back to the transferable balance.
    function release(bytes32 region, uint256 amount) external {
        require(amount > 0, "Nexora: zero");
        require(reservedIn[msg.sender][region] >= amount, "Nexora: reserved");
        reservedIn[msg.sender][region] -= amount;
        reservedOf[msg.sender] -= amount;
        totalReserved -= amount;
        balanceOf[msg.sender] += amount;
        emit Released(msg.sender, region, amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "Nexora: zero to");
        require(balanceOf[from] >= amount, "Nexora: balance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "Nexora: zero to");
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
}
