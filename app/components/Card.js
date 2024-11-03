import React, { useState, useEffect } from 'react';
import { ethers, parseEther, toUtf8Bytes, hexlify } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Router from 'next/router';
import { useWallet } from '../contexts/WalletContext';
import { app, db } from '../../lib/firebase';
import { ref, set, onValue, off, get } from "firebase/database";

const Card = ({id, name, desat, data, key}) => {
  const { connectedAddress, setConnectedAddress, walletChanged, setWalletChanged } = useWallet();
  const provider = new ethers.BrowserProvider(window.ethereum, 'sepolia')
  const hourglass = <img className='w-8 invert' src='/hourglass-time.gif' alt='hourglass'/>

  const saveTransaction = async (hash, dataValue) => {
    try {
      const transactionRef = ref(db, `transactions/${hash}`);
      await set(transactionRef, {
        hash,
        dataValue,
      });
      //console.log("Transaction saved successfully!");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const txnToast = (x, y) => {
    if (!(x instanceof Promise)) {
      // If x is not a promise, you can handle it here
      console.error('txnToast error: x is not a promise');
      return;
    }

  toast.promise(x, {
      loading: `${y} (Awaiting user confirmation)...`,
      success: 'Blockchain confirmation pending...',
      error: 'Transaction failed!',
    },
    {
      style: {
        color: '#fff',
        background: '#DB2777',
      },
      success: {
        duration:3600000,
        icon:hourglass,
      },
      loading: {
        icon:hourglass,
      },
      error: {
        icon:'👎',
      }
    });
  };

  const sendTransaction = async () => {
    if (window.ethereum) {
      try {
        //get currently connected account info
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const metamask = new ethers.BrowserProvider(window.ethereum)
        const signer = await metamask.getSigner(accounts[0]);

        //create and send 0 ETH transaction with ethscription in the data field
        const tx = signer.sendTransaction({
          to: signer.address,
          value: parseEther('0'),
          data: hexlify(toUtf8Bytes(data)),
        });

        txnToast(tx, `Ethscribing ${name} #${id}`); 

        await tx
        .then(async (result) => {
          const rh = result.hash
          const rd = result.data
          await metamask.waitForTransaction(rh).then((listReceipt) => {
            if (listReceipt.status === 1) { // Check if listing transaction was successful
              toast.dismiss();
              toast('Transaction confirmed!', {
                style: {
                  color: '#fff',
                  background: '#DB2777',
                  icon:'👍'
                },
              });
              saveTransaction(rh, rd);
            } else {
              toast.dismiss();
              toast('Transaction failed!', {
                style: {
                  color: '#fff',
                  background: '#DB2777',
                  icon:'👎'
                },
              });
            }
          });
        });
      } catch (error) {
        console.log('MetaMask not found or error:', error);
      }
    }
  }
  
  return (
    <div
      key={key}
      className={desat ?
                "saturate-0 inline-block bg-gray-800 hover:bg-pink-500 text-pink-500 hover:text-gray-800 cursor-pointer"
                :
                "inline-block bg-gray-800 hover:bg-pink-500 text-pink-500 hover:text-gray-800 cursor-pointer"
              }
      onClick={() => {
        desat ?
        toast(`${name} #${id} already Ethscribed!`, {
                style: {
                  color: '#fff',
                  background: '#DB2777',
                  icon:'👎'
                },
              })
        : 
        sendTransaction();
        }
      }
    >
      <div>
        <Image
          className="w-100"
          src={`/remix${id}.png`}
          loading="lazy"
          alt={`phunk ${id}`}
          height="150"
          width="150"
        />
      </div>
      <div className="ml-2 mb-2 text-md font-bold">
        <p>{`${name} #${id}`}</p>
      </div>
    </div>
  );
};

export default Card;
