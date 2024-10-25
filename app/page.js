"use client";
import { React, useState, useEffect } from "react"
import { ethers } from "ethers"
import Image from "next/image";
import Header from ".//components/Header";
import Card from ".//components/Card";
import Footer from ".//components/Footer";
import phremix from ".//utils/Atts";

export default function Home() {
  const pr = phremix;

  return (
    <div className="bg-grey-900 flex flex-col h-screen justify-between">
      <Header/>
      <div className="mb-auto h-10 ml-4 my-6 w-5/6">
        <h1 className="text-white text-2xl">(PH)REMIX.2174</h1>
        <p className="text-white text-l">A collection of xxx CryptoPhunk remixes inspired by sampling in hip-hop beats, (PH)REMIXes are the next iteration of Phunk Remixes by <a href="https://x.com/0xDuplo" target="_blank" className="text-pink-500">Duplo</a>. While the first remixes we all manually created, (PH)REMIXes are computer assisted, with pixels randomly placed in a specified region (or regions) of the origional 24x24 grid, starting with <a href="https://www.vphree.io/cryptophunk/2174" target="_blank" className="text-pink-500">CryptoPhunk 2174</a>.</p>
        <br/>
        <p className="text-white text-l mb-6">To <a href="https://ethscriptions.com/" target="_blank" className="text-pink-500">Ethscribe</a> a (PH)REMIX, simple click the image and confirm the transaction. Simple as that.</p>
        <div className="flex flex-wrap justify-start">
          {pr.map((phunk) => (
            (typeof(phunk.id) != 'undefined' ?
              <Card
                id={phunk.id}
                name={phunk.name}
                key={`${phunk.name}${phunk.id}`}
              />
            : null )  
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
