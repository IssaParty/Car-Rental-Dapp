// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

//Allows us to use the celo stable coin to interact with the blockchain
interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract CarRental{
    
    uint internal carLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
  
        struct Car{
        address payable owner;
        string carName;
        string carDescription;
        string carImage; 
        uint price;
        bool isUsed; 
        bool isBought;
    }
    
    mapping (uint => Car) internal cars;

        function setCar(
        string memory _carName,
        string memory _carDescription,
        string memory _carimage,
        bool _isUsed,
        uint _price
    )public {
        cars[carLength] = Car(
              payable(msg.sender),
              _carName,
              _carDescription,
              _carimage,
              _price,
              _isUsed,
              false
        );
        carLength++;
    }

        function getCar (uint _index) public view returns (
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        bool,
        bool
    ) {
        Car storage car = cars[_index];
        return(
          car.owner,
          car.carName,
          car.carDescription,
          car.carImage,
          car.price,
          car.isUsed,
          car.isBought
        );
    }

        function buyCar(uint _index) public  payable {
        require(cars[_index].isBought == false,"Not for Sale");
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            cars[_index].owner,
            cars[_index].price
          ),
          "This transaction could not be performed"
        );
        
        // change owner
        cars[_index].owner = payable(msg.sender);
        // change the sale  status
        cars[_index].isBought = true;
        
    }

        function sellCar(uint _index) public {
        require(msg.sender == cars[_id].owner,"Accessible only to the owner");
        cars[_index].isBought = false;
    }
    
    // function to get the length of the car array
    function getCarLength() public view returns (uint) {
        return (carLength);
    }
}
