pragma solidity ^0.4.23;

contract Quiz {
    address public manager;
    address[] public players;
    bool public complete;
    string[2] public titles;
    uint256[2] public balances;
    mapping(address => uint256)[2] public playersMap;
    
    constructor(string _title1, string _title2) public {
        manager = msg.sender;
        titles[0] = _title1;
        titles[1] = _title2;
        complete = false;
    }
    
    function bet(uint8 side) public payable {
        require( msg.value > .01 ether );
        require ( side == 0 || side == 1 );
        
        uint256 _value = playersMap[side][msg.sender];
        balances[side] = balances[side] + msg.value;
        
        if (playersMap[0][msg.sender] <= 0 && playersMap[1][msg.sender] <= 0) {
            players.push(msg.sender);
        }
        
        playersMap[side][msg.sender] = msg.value + _value;
    }
    
    function pickWinner(uint8 side) public restricted(side) {
        
        for (uint i = 0; i < players.length; i++) {
            uint _balance = playersMap[side][players[i]];
            if (_balance > 0) {
                uint rate = _balance / balances[side];
                players[i].transfer(address(this).balance * rate );
            }
        }
        
        reset();
    }
    
    function reset() public {
        complete = true;
        players = new address[](0);
    }
    
    modifier restricted(uint8 side) {
        require(msg.sender == manager);
        require( side == 0 || side == 1);
        require( balances[0] + balances[1] > 0 );
        _;
    }

    function getMyBalance() public view returns (uint256, uint256) {
        return (playersMap[0][msg.sender], playersMap[1][msg.sender]);
    }


    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    function getBalances() public view returns (uint256[2]) {
        return balances;
    }
}