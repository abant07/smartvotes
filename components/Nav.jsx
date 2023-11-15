"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

const Hometwo = () => {
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProvider(new BrowserProvider(window.ethereum));
    }
  }, []);

  useEffect(() => {
    if (provider) {
      const requestAccounts = async () => {
        try {
          await provider.send("eth_requestAccounts", []);
          setIsConnected(true);
        } catch (error) {
          console.error(error);
          setIsConnected(false);
        }
      };

      requestAccounts();
    }
  }, [provider]);

  const login = async () => {
    console.log('trying login function');
    try {
      await window.ethereum.send("eth_requestAccounts");
      setIsConnected(true);
    } catch (error) {
      console.log('Metamask not working');
      setIsConnected(false);
      return;
    }
  };

  const buttonText = isConnected ? "Disconnect Wallet" : "Connect Wallet";

  return (
    <nav className='flex-between w-full mb-16 pt-3 items-center justify-between'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logosmart.png'
          alt='logo'
          width={50}
          height={50}
          className='object-contain'
        />
        <h1 className='logo_text mx-auto'>KR Votes</h1>
      </Link>
      
      <div className='sm:flex hidden'>
        <>
          <button
            type='button'
            className='green_btn'
            onClick={login}
            style={{ cursor: 'pointer' }}
          >
            {buttonText}
          </button>
        </>
      </div>
    </nav>
  );
};

export default Hometwo;


