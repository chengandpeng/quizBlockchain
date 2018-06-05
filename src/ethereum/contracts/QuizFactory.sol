pragma solidity ^0.4.23;

import "./Quiz.sol";

contract QuizFactory {
    address[] public creatorList;
    mapping(address => address[]) public creatorDeployedMap;
    
    function createQuiz(string _title1, string _title2) public {
        address newQuiz = new Quiz(_title1, _title2, msg.sender);
        
        address[] storage _list = creatorDeployedMap[msg.sender];
        if (_list.length <= 0) {
            creatorList.push(msg.sender);
        } 
        _list.push(newQuiz);
        creatorDeployedMap[msg.sender] = _list;
    }
    
    function getCreatorList() public view returns (address[]) {
        return creatorList;
    }
    
    function getDeployedQuiz(address creatorAddress) public view returns (address[]) {
        return creatorDeployedMap[creatorAddress];
    }
}