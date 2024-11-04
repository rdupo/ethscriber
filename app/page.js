"use client";
import { React, useState, useEffect } from "react"
import { ethers, toUtf8Bytes, hexlify } from 'ethers';
import Image from "next/image";
import Header from ".//components/Header";
import Card from ".//components/Card";
import Footer from ".//components/Footer";
import phremix from ".//utils/Atts";
import { app, db } from '../lib/firebase';
import { ref, set, onValue, off, get } from "firebase/database";

export default function Home() {
  const pr = phremix;
  const [transactions, setTransactions] = useState([]);
  
  const check = (phunkData) => {
    const matchFound = transactions.some(obj => obj.dataValue === phunkData);  
    return matchFound;
  }

  useEffect(() => {
    const dbRef = ref(db, 'transactions/');
    
    const fetchData = async () => {
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTransactions(Object.values(data));
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data with get():", error);
      }
    };

    // Initial fetch on component mount
    fetchData();

    // Set up a listener for changes
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTransactions(Object.values(data));
      } else {
        console.log("No data available");
      }
    });

    // Clean up the listener on component unmount
    return () => {
      off(dbRef, 'value', unsubscribe);
    };
  }, []);

  return (
    <div className="bg-grey-900 flex flex-col h-screen justify-between">
      <Header/>
      <span className="bg-pink-500 text-white pl-4 py-2">🚧 Down for maintenance 🚧</span>
      {/*<span className="bg-pink-500 text-white pl-4 py-2">🚨 This site is for QA purposes only - please confirm you are on Sepolia testnet before sending any transactions! 🚨</span>*/}
      <div className="mb-auto h-10 my-6">
        {/*revert all gray-700 text below back to white, pink-900 to pink-500*/}
        <h1 className="ml-4 w-11/12 text-gray-700 text-2xl mb-2">(PH)REMIX.2174</h1>
        <p className="ml-4 w-11/12 text-gray-700 text-l">A collection of 100 CryptoPhunk remixes inspired equally by CryptoPhunk artwork and the sampling commonly found in hip-hop production, (PH)REMIXes are the next iteration of Phunk Remixes by <a href="https://x.com/0xDuplo" target="_blank" className="text-pink-900">Duplo</a>. While the first remixes we all manually created, (PH)REMIXes are computer assisted, with pixels randomly placed in a specified region (or regions) of the origional 24x24 grid, starting with <a href="https://www.vphree.io/cryptophunk/2174" target="_blank" className="text-pink-900">CryptoPhunk 2174</a>.</p>
        <br/>
        <p className="ml-4 w-11/12 text-gray-700 text-l mb-6">To <a href="https://ethscriptions.com/" target="_blank" className="text-pink-900">Ethscribe</a> a (PH)REMIX just click the image and confirm the transaction from your wallet. Simple as that.</p>
        <div className="flex flex-wrap justify-center pb-80">
          {/*pr.map((phunk) => (
            (typeof(phunk.id) != 'undefined' ?
              <Card
                id={phunk.id}
                name={phunk.name}
                key={`${phunk.name}${phunk.id}`}
                desat={check(hexlify(toUtf8Bytes(phunk.data)))}
                data={phunk.data}
              />
              : 
              null)  
          ))*/}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
