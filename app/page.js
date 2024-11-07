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
  const [imReady, setImReady] = useState(false);
  
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
          setImReady(true);
        } else {
          console.log("No data available");
          setImReady(true);
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
      {/*<span className="bg-pink-500 text-white pl-4 py-2">🚧 Down for maintenance 🚧</span>*/}
      <span className="bg-pink-500 text-white pl-4 py-2">🚨 This site is for QA purposes only - please confirm you are on Sepolia testnet before sending any transactions! 🚨</span>
      <div className="mb-auto h-10 my-6">
        <h1 className="ml-4 w-11/12 text-white text-2xl mb-2">(PH)REMIX.2174</h1>
        <p className="ml-4 w-11/12 text-white text-l">A collection of 50 CryptoPhunk remixes inspired equally by CryptoPhunk artwork and the sampling commonly found in hip-hop production, (Ph)remix is the next iteration of Phunk Remixes by <a href="https://x.com/0xDuplo" target="_blank" className="text-pink-500">Duplo</a>. While the first remixes we all manually created, (Ph)remixes are computer assisted, with pixels randomly placed in a specified region (or regions) of the origional 24x24 grid, starting with <a href="https://www.vphree.io/cryptophunk/2174" target="_blank" className="text-pink-500">CryptoPhunk 2174</a>.</p>
        <br/>
        <p className="ml-4 w-11/12 text-white text-l mb-6">To <a href="https://ethscriptions.com/" target="_blank" className="text-pink-500">Ethscribe</a> a (Ph)remix just click the image and confirm the transaction from your wallet. Simple as that.</p>
        <div className="flex flex-wrap justify-center pb-80">
          {!imReady ?
            <span className="text-2xl text-[#c3ff00] my-6 p-2 animate-pulse">[  [ [Loading] ]  ]</span>
            :
            pr.map((phunk) => 
              <Card
                id={phunk.id}
                name={phunk.name}
                key={`${phunk.name}${phunk.id}`}
                desat={check(hexlify(toUtf8Bytes(phunk.data)))}
                data={phunk.data}
              />
            )
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
}
