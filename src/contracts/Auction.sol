pragma solidity ^0.5.0;

contract Auction {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string content;
        uint bidAmount;
        address payable owner;
    }

    event PostCreated(
        uint id,
        string content,
        uint bidAmount,
        address payable owner
    );

    event Amount(
        uint id,
        string content,
        uint bidAmount,
        address payable owner
    );

    constructor() public {
    }

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0);
        postCount ++;
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function bidPost(uint _id) public payable {
        require(_id > 0 && _id <= postCount);
        Post memory _post = posts[_id];
        address payable _owner = _post.owner;
        address(_owner).transfer(msg.value);
        _post.bidAmount = _post.bidAmount + msg.value;
        posts[_id] = _post;
        emit bidPost(postCount, _post.content, _post.bidAmount, _owner);
    }
}
