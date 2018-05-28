pragma solidity ^0.4.23;

contract Quiz {
    address public manager;
    address[] public players;
    bool public complete;
    string[2] public titles;
    uint256[2] public balances;
    mapping(address => uint256)[2] public playersMap;
    uint8 public winSide;
    bool public closing;
    
    constructor(string _title1, string _title2, address creator) public {
        manager = creator;
        titles[0] = _title1;
        titles[1] = _title2;
        complete = false;
        closing = false;
    }
    
    function bet(uint8 side) public payable {
        if (closing) return;
        
        require(msg.value > .0001 ether);
        require(side == 0 || side == 1);
        
        uint256 _value = playersMap[side][msg.sender];
        balances[side] = balances[side] + msg.value;
        
        if (playersMap[0][msg.sender] <= 0 && playersMap[1][msg.sender] <= 0) {
            players.push(msg.sender);
        }
        
        playersMap[side][msg.sender] = msg.value + _value;
    }
    
    function closeBet() public restricted() {
        closing = true;
    }
    
    function pickWinner(uint8 side) public restricted() {
        require(side == 0 || side == 1);
        require(balances[0] + balances[1] > 0);
        
        uint totlaBalance = address(this).balance;
        for (uint i = 0; i < players.length; i++) {
            uint _balance = playersMap[side][players[i]];
            if (_balance > 0) {
                uint v = totlaBalance * _balance / balances[side];
                players[i].transfer(v);
                playersMap[side][players[i]] = 0;
            }
        }
        
        manager.transfer(address(this).balance);
        winSide = side;
        complete = true;
    }
    
    function refund() public restricted() {
        for (uint i = 0; i < 2; i++) {
            for (uint j = 0; j < players.length; j++) {
                uint _balance = playersMap[i][players[j]];
                if (_balance > 0) {
                    players[j].transfer(_balance);
                    playersMap[i][players[j]] = 0;
                }
            }
        }
    }
    
    function reset() public {
        complete = false;
        players = new address[](0);
        balances = [0, 0];
        titles = ["", ""];
        closing = false;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
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