import Button from "../button/Button";
import styles from "./Landing.module.css";
import React, {useContext, useEffect, useState} from "react";
import {DotLoader} from "react-spinners";
import {WalletContext} from "../../store/WalletContext";
// import logo from './sun.gif';
import {ethers} from "ethers";
import Web3Modal from "web3modal";

const Landing = () => {
    const [isConnecting, setIsConnecting] = useState(false);
    const {currentAccount, setCurrentAccount} = useContext(WalletContext);

    const connectWallet = async () => {
        setIsConnecting(true);

        const providerOptions = {};

        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions
        });

        const provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const address = await ethersProvider.getSigner().getAddress();

        setIsConnecting(false);
        setCurrentAccount(address);
    }

    useEffect(() => {
        setCurrentAccount();
    }, []);

    return (
        <div className={styles["main_wrapper"]}>
            <div className={styles["landing_wrapper"]}>
                <a href="https://yiume.eu" className="main">
                    {/*<img src={logo} className={styles["logo"]} alt="Logo"/>*/}
                    txn carbon impact dashboard
                </a>
                <div className={styles["button_wrapper"]}>
                    {!currentAccount && (
                        <Button onClick={connectWallet}>
                            {isConnecting ? <DotLoader color="white" size={20}/> : "Connect Wallet"}
                        </Button>
                    )}
                    {currentAccount && <Button onClick={null}>Wallet Connected</Button>}
                </div>
            </div>
        </div>
    );
};


export default Landing;
