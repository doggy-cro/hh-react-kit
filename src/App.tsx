import { useState } from 'react';
import { ethers } from 'ethers';


const App = () => {
  const [accountAddress, setAccountAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [connectButtonText, setConnectButtonText] = useState('Connect wallet');
  const [errorMessage, setErrorMessage] = useState('');

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      // EIP-1102
      // Under the hood, it calls wallet_requestPermissions for the eth_accounts permission.
      // Since eth_accounts is currently the only permission, this method is all you need for now.
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const accountAddress = accounts[0];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ethBalance = await provider.getBalance(accounts[0]);
      const balance = ethers.utils.formatEther(ethBalance);
      setAccountAddress(accountAddress);
      setEthBalance(balance);

      // set connection button status
      setConnectButtonText('Wallet connected');
    } else {
      setErrorMessage('Need to install MetaMask.');
    }
  };

  return (
    <div>
      <button onClick={connectWalletHandler}>{connectButtonText}</button>
      <p>{errorMessage}</p>
      <div>
        <p>Account: {accountAddress}</p>
        <p>Eth balance: {ethBalance}</p>
      </div>
    </div>
  );
};

export default App;
