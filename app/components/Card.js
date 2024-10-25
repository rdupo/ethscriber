import React, { useState } from 'react';
import { ethers } from "ethers";
import Image from 'next/image';
import Router from 'next/router';
import { useWallet } from "../contexts/WalletContext";

const Card = ({id, name}) => {
  const { connectedAddress, setConnectedAddress, walletChanged, setWalletChanged } = useWallet();
  const provider = new ethers.BrowserProvider(window.ethereum)
  //const [signer, setSigner] = useState([]);

  const sendTransaction = async () => {
    if (window.ethereum) {
      try {
        //get currently connected account info
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const metamask = new ethers.BrowserProvider(window.ethereum)
        const signer = await metamask.getSigner(accounts[0]);
        console.log(`card|signer: ${signer.address}`)

        //create and send 0 ETH transaction with ethscription in the data field
        const tx = await signer.sendTransaction({
          to: signer.address,
          value: ethers.utils.parseEther("0"),
          data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("note 123")),
        });

        console.log("Transaction sent:", tx);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed:", tx);

      } catch (error) {
        console.log("MetaMask not found or error:", error);
      }
    }
  }

    /*if (signer && userAddress) {
      try {
        // Create a 0 ETH transaction with a note in the data field
        const tx = await signer.sendTransaction({
          to: userAddress, // Send to the same address
          value: ethers.utils.parseEther("0"), // 0 ETH
          data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("note 123")), // Add the note as data
        });

        
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    } else {
      console.log("Wallet not connected!");
    }
  };*/
  
  return (
    <div
      className="inline-block bg-gray-800 hover:bg-pink-500 text-pink-500 hover:text-gray-800 cursor-pointer"
      onClick={() => { 
        //alert(`You clicked on ${name} #${id}`);
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
          height="200"
          width="200"
        />
      </div>
      <div className="ml-2 mb-2 text-md font-bold">
        <p>{`${name} #${id}`}</p>
      </div>
    </div>
  );
};

export default Card;
