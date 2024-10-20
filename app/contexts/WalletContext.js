// WalletContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [connectedAddress, setConnectedAddress] = useState('');

  useEffect(() => {
    const storedAddress = sessionStorage.getItem('connectedAddress');
    if (storedAddress) {
      setConnectedAddress(storedAddress);
    }

    const handleAccountsChanged = (accounts) => {
      setConnectedAddress(accounts[0] || '');
      sessionStorage.setItem('connectedAddress', accounts[0] || '');
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const value = {
    connectedAddress,
    setConnectedAddress,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}