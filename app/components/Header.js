import { React, useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { ethers } from "ethers"
import Wallet from "../assets/wallet.svg"
import { useWallet } from "../contexts/WalletContext"

const Header = () => {
  const { connectedAddress, setConnectedAddress, walletChanged, setWalletChanged } = useWallet();

  useEffect(() => {
	  // Update connectedWallet in the page whenever it changes
	  if (walletChanged) {
	    setWalletChanged(false);
	  }
	}, [connectedAddress, walletChanged, setWalletChanged]);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const metamask = new ethers.BrowserProvider(window.ethereum)
        const signer = await metamask.getSigner(accounts[0]);
        const address = await signer.getAddress();
        setConnectedAddress(address); 
      } catch (error) {
        console.log("MetaMask not found or error:", error);
      }
    }
  }

	return 	(
		<div className="bg-[#c3ff00] flex pl-4">
			<div className="mr-auto">
			<p className="text-xl uppercase font-black">(ph)remix</p>
			</div>
			<div className="justify-content-end mr-5 align-middle">
				
				{ connectedAddress.length === 0 ?
					<Image 
						height={28}
						className="inline-flex cursor-pointer" 
						src={Wallet}
						alt="connect wallet icon"
						onClick={connectWallet}
					/> : 
					<p className="inline-flex">
						{connectedAddress.substr(0,4) + 
						"..." + 
						connectedAddress.substr(connectedAddress.length-4, connectedAddress.length)}
					</p>
				}
			</div>
		</div>
	)
} 

export default Header