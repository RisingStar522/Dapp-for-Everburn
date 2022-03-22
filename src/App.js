import Header from './components/Header';
import BannerDash from './components/BannerDash';
import Container from './components/Container';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { EVB_ABI, EVB_ADDRESS } from './contracts/evb';
import { DIVIDEND_ABI, DIVIDEND_ADDRESS } from './contracts/dividendDistributor';
import React from 'react';
//import { ethers } from 'ethers';

function App() {

  // const web3 = new Web3(window.ethereum);
//  const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/11d2dfe1e20648a7a459f4ef5e57aa2f");
  const web3 = new Web3(Web3.givenProvider || "https://inklsbpw5qgz.usemoralis.com:2053/server");
  // const web3 = new Web3(Web3.givenProvider || "https://speedy-nodes-nyc.moralis.io/0c1fe2423a49c706e3513b1d/avalanche/mainnet"); // avalanche mainnet
  // const web3 = new Web3(Web3.givenProvider || "https://speedy-nodes-nyc.moralis.io/0c1fe2423a49c706e3513b1d/avalanche/testnet"); // avalanche testnet
  
  const evb = new web3.eth.Contract(EVB_ABI, EVB_ADDRESS);
  
  const dividend = new web3.eth.Contract(DIVIDEND_ABI, DIVIDEND_ADDRESS)

  const [{ metaMaskPresent, metaMaskConnected }, setMetaMaskObject] = useState({
    metaMaskPresent: false,
    metaMaskConnected: false
  });

  const [publicKey, setPublicKey] = useState("Connect Wallet"); // My address
  const [currentBalance, setCurrentBalance] = useState(0); 
  const [rewardPercentByHoldings, setRewardPercentByHoldings] = useState(0);  
  const [UnpaidEarnings, setUnpaidEarnings] = useState(0); 

  const connectMetaMask = async () => {
    const accounts = await web3.eth.requestAccounts();
    setPublicKey(accounts[0]);
    getBalance(accounts[0]);
    getRewardPercentByHoldings(accounts[0]);
    getUnpaid(accounts[0]);
  };

  const getBalance = (_publicKey) => {
    let FormatedResult = 0;
    console.log('getBalance');
    evb.methods.balanceOf(_publicKey).call().then(function (result) {
      FormatedResult = result/1000000;
      FormatedResult = FormatedResult.toLocaleString();
      console.log(FormatedResult);
      setCurrentBalance(FormatedResult);
    });
  }
  const getUnpaid = (_publicKey) => {
    let UnpaidFormated = 0;
    console.log('getBalance');
    dividend.methods.getUnpaidEarnings(_publicKey).call().then(function (result) {
      UnpaidFormated = result/1000000;
      UnpaidFormated = UnpaidFormated.toFixed(2)
      console.log(result);  
      setUnpaidEarnings(UnpaidFormated);
    });
  }

  const getRewardPercentByHoldings = async (_publicKey) => {
    console.log('getRewardPercentByHoldings');
    let circulatingSupply = 0;
    await evb.methods.getCirculatingSupply().call().then(function (result) {
      console.log(result);
      circulatingSupply = result;
    });
    evb.methods.balanceOf(_publicKey).call().then(function (result) {
      
      console.log(result);
      console.log(circulatingSupply);
      if ( circulatingSupply !== 0 ) {
        setRewardPercentByHoldings(((result / circulatingSupply)*100).toFixed(2));
      } else {
        setRewardPercentByHoldings(0);
      }
    });
  }

  useEffect(() => {
    const isMetaMaskPresent = () => {
      return web3?.givenProvider?.isMetaMask ? true : false;
    };
    setMetaMaskObject(() =>
      isMetaMaskPresent()
        ? { metaMaskPresent: true, metaMaskConnected }
        : { metaMaskPresent: false, metaMaskConnected }
    );
  }, [web3?.givenProvider?.isMetaMask, metaMaskConnected]);


  return (
    <div>
      <Header />
      <BannerDash 
        connectMetaMask={connectMetaMask} 
        metaMaskPresent={metaMaskPresent} 
        metaMaskConnected={metaMaskConnected} 
        publicKey={publicKey}
      />
      <Container 
        evb={evb} 
        dividend={dividend} 
        publicKey={publicKey} 
        currentBalance={currentBalance}
        rewardPercentByHoldings={rewardPercentByHoldings}
        UnpaidEarnings={UnpaidEarnings}
      />
      <Footer />
    </div>
  );
}

export default App;
