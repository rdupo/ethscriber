import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

const Card = ({id, name}) => {
  const sendTransaction = async () => {
    if (signer && userAddress) {
      try {
        // Create a 0 ETH transaction with a note in the data field
        const tx = await signer.sendTransaction({
          to: userAddress, // Send to the same address
          value: ethers.utils.parseEther("0"), // 0 ETH
          data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("note 123")), // Add the note as data
        });

        console.log("Transaction sent:", tx);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed:", tx);
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    } else {
      console.log("Wallet not connected!");
    }
  };
  
  return (
    <div
      key={id}
      className="inline-block bg-gray-800 hover:bg-pink-500 text-pink-500 hover:text-gray-800 cursor-pointer"
      onClick={() => { 
        alert(`You clicked on ${name} #${id}`);       
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
