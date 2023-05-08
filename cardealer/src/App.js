import React, { useState, useEffect } from 'react';

import './App.css';
import Header from './components/Header';
import SalesCars from './components/SalesCars';
import AddCar from './components/AddCar';
import MyCar from './components/MyCar';

import Web3 from 'web3'
import BigNumber from "bignumber.js";

import cardealer from './abis/car.abi.json';
//import erc20 from './abis/erc20.abi.json';

const ERC20_DECIMALS = 18;

const contractAddress = "0x83dce46765c4420b8E93eE1b2e9Fc79d254E9212";
const cUSDContractAddress = "" //"0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

function App() {

  const [metaMaskBalance, setMetaMaskBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [networkName, setNetworkName] = useState("");
  
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [cars, setCars] = useState([]);
  const [myCars, setMyCars] = useState([]);

  const connectMetaMaskWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        console.log(window.ethereum.selectedAddress);
        setWeb3(web3);
        setAddress(window.ethereum.selectedAddress);
      } catch (error) {
        console.log('There is an error')
        console.log({ error });
      }
    } else {
      console.log("please install MetaMask");
    }
  };
  const getNetworkName = async () => {
    const networkId = await window.ethereum.networkVersion;
    console.log("Network Id: ",networkId);
    switch (networkId) {
      case "1":
        return "Mainnet";
      case "3":
        return "Ropsten Testnet";
      case "4":
        return "Rinkeby Testnet";
      case "5":
        return "Goerli Testnet";
      case "42":
        return "Kovan Testnet";
      case "31337":
        return "Foundry";
      case "11155111":
        return "Sepolia";
      default:
        return "Unknown network";
    }
  };
  
  /* Prevoious Code to connext to Celo Wallet
  const connectCeloWallet = async () => {
    if (window.celo) {
      // notification("⚠️ Please approve this DApp to use it.")
      try {
        await window.celo.enable();
        // notificationOff()
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];
        console.log(user_address);
        kit.defaultAccount = user_address;

        await setAddress(user_address);


        await setKit(kit);

      } catch (error) {
        console.log('There is an error')
        console.log({ error });
        // notification(`⚠️ ${error}.`)
      }
    } else {
      console.log("please install the extension");
      // notification("⚠️ Please install the CeloExtensionWallet.")
    }
  };

  */
  useEffect(() => {
    connectMetaMaskWallet();
  }, []);

  useEffect(() => {
    if (address) {
      return getBalance();
    } else {
      console.log("no web3 or address");
    }
  }, [address]);

  useEffect(() => {
    if (contract) {
      getCars()
    };
  }, [contract]);

  const getBalance = async () => {
      // Call the function to get the network name
    const networkName = await getNetworkName();
    console.log("Network name:", networkName);
    const balance = await web3.eth.getBalance(address);
    const etherBalance = web3.utils.fromWei(balance, 'ether');
    console.log("Ether balance: ", etherBalance);
    const contract = new web3.eth.Contract(cardealer, contractAddress);
    setNetworkName(networkName);
    setContract(contract);
    setMetaMaskBalance(etherBalance);
  };

  // function to get the list of cars from the celo blockchain
  const getCars = async function () {
    const carLength = await contract.methods.getCarLength().call();
    const _cars = [];

    for (let index = 0; index < carLength; index++) {
      let _car = new Promise(async (resolve, reject) => {
        let c = await contract.methods.getCar(index).call();
        resolve({
          index: index,
          owner: c[0],
          carName: c[1],
          carDescription: c[2],
          carImage: c[3],
          price: new BigNumber(c[4]),
          isUsed: c[5],
          isRent: c[6],
          isSale:c[7],
          isBought: c[8],
          isRented: c[9]
        })
      });

      _cars.push(_car);
    }
    const cars = await Promise.all(_cars);
    
    setCars(cars);

    // return cars that have been bought or rented
    const _myCars = cars.filter((car)=>{
      return (car.owner === address && (car.isSale === false && car.isRent === false));
    })    
    setMyCars(_myCars);
    
  }

  // function to add cars to block
  const addtoCars = async (_name, _description, _image, _price, _isUsed, _isRent, _isSale) => {
    try {
      const price = new BigNumber(_price)
        .shiftedBy(ERC20_DECIMALS).toString();


      await contract.methods
        .setCar(
          _name,
          _description,
          _image,
          _isUsed,
          _isRent,
          _isSale,  
          price
        )
        .send({ from: address });
      getCars();
    } catch (error) {
      console.log(error);
    }

  }

  // function to initiate transaction
  const buyCar = async (_price, _index) => {
    try {
      const cUSDContract = new web3.eth.Contract(cardealer, contractAddress);
      //const cUSDContract = new kit.web3.eth.Contract(erc20, cUSDContractAddress);
      const cost = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();

      const result = await cUSDContract.methods
        .approve(contractAddress, cost)
        .send({ from: address });

      await contract.methods.buyCar(_index).send({ from: address });
      // return result
      getBalance();
      getCars();
    } catch (error) {
      console.log({ error });
    }
  };

    // function to initiate transaction
  const rentingCar = async (_price, _index) => {
    try {
      const cUSDContract = new web3.eth.Contract(cardealer, contractAddress);
      //const cUSDContract = new kit.web3.eth.Contract(erc20, cUSDContractAddress);
      const cost = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();

      await cUSDContract.methods
        .approve(contractAddress, cost)
        .send({ from: address });

      await contract.methods.rentingCar(_index).send({ from: address });
      // return result
      getBalance();
      getCars();
    } catch (error) {
      console.log({ error });
    }
  };

  // function that is called to make a car available for sale
  const sellCar = async (index) => {
    try {

      await contract.methods.sellCar(index).send({ from: address });

      getCars();
    } catch (error) {
      console.log({ error });
      alert("Something went wrong");
    }
  };

  // function that is called to make a car available for rentals
  const rentCar = async (index) => {
    try {

      await contract.methods.rentCar(index).send({ from: address });

      getCars();
    } catch (error) {
      console.log({ error });
      alert("Something went wrong");
    }
  };

  return (

    <div className="content">
      <Header balance={cUSDBalance} celo = {metaMaskBalance} network = {networkName}/>
      {/* Render the sales cars component */}
      {<SalesCars cars={cars} buyCar={buyCar} />}

      {/* Render the add car component */}
      {<AddCar addToCars={addtoCars} />}

      {/* Render the my car component */}
      {<MyCar cars={myCars} sellCar={sellCar} rentCar={rentCar} />}
    </div>

  );
}

export default App;
