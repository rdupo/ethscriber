import { React, useState, useEffect } from 'react'
//import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { ethers } from 'ethers'
import Wallet from '../assets/wallet.svg'
//import { useWallet } from './/contexts/WalletContext'

const Header = () => {
  /*const { connectedAddress, setConnectedAddress, walletChanged, setWalletChanged } = useWallet();

  useEffect(() => {
	  // Update connectedWallet in the page whenever it changes
	  if (walletChanged) {
	    //console.log('Re-rendering page...');
	    setWalletChanged(false); // Reset walletChanged to false
	  }
	}, [connectedAddress, walletChanged, setWalletChanged]);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const mmp = new ethers.providers.Web3Provider(window.ethereum);
        const signer = mmp.getSigner(accounts[0]);       
        const address = await signer.getAddress();
        setConnectedAddress(address); // Update the state with the connected address
      } catch (error) {
        console.log('MetaMask not found or error:', error);
      }
    }
  }*/

	return 	(
		<div className="bg-[#c3ff00] flex pl-4">
			<div className="mr-auto">
			<p className="text-xl uppercase font-black">(ph)remix</p>
				{/*<Link href="/">
					<Image
						height={40} 
						className="inline-flex align-middle my-3 ml-8 h-img" 
						src={Logo}
						alt="vphree logo"
					/>
					<h1 className="inline-flex align-middle ml-2">Remix</h1>
				</Link>*/}
			</div>
			<div className="justify-content-end">
				<Image 
					height={28}
					className="inline-flex mr-5 h-img-w align-middle" 
					src={Wallet}
					alt="connect wallet icon"
					//onClick={connectWallet}
				/>
				{/*{ connectedAddress.length === 0 ?
					null : 
					<Image
						height={40}
						className="inline-flex align-middle my-3 mr-8 h-img brite" 
						src={Profile}
						alt="profile icon"
					/>
				}*/}
			</div>
		</div>
	)
} 

export default Header