import React, {useContext, useEffect, useState} from "react";
import {Link, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import styles from "./Main.module.css";
import {WalletContext} from "../store/WalletContext";
// import Docs from "./Docs";
import Home from "./Home";
import logo from "../Txn_Carbon.png";


const Main = () => {
    const {currentAccount, setCurrentAccount} = useContext(WalletContext);

    const navigate = useNavigate();

    const disconnectWallet = async () => {
        try {
            const {ethereum} = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            // TODO: clear window.ethereum cache - this solution is not working
            await window.ethereum.request({
                method: "eth_requestAccounts",
                params: [{eth_accounts: {}}]
            });
            setCurrentAccount("");
            navigate('')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles["main_wrapper"]}>
            <div className={styles["navigation_wrapper"]}>
                <div className={styles["nav_logo_wrapper"]}>
                    <img src={logo} className={styles["logo"]} alt="Logo"/>
                    <Link to="/" style={{
                        display: 'inline', paddingLeft: '15px',
                        paddingRight: '15px'
                    }}>Home</Link>
                    <Link to="/docs" style={{
                        display: 'inline', paddingLeft: '15px',
                        paddingRight: '15px'
                    }}>Docs</Link>
                </div>
                <div className={styles["nav_account_wrapper"]}>
                    <div className={styles["nav_account_actions"]}>
                        <div
                            className={styles["account_text"]}>{currentAccount.slice(0, 6) + "..." + currentAccount.slice(38, 42)}</div>
                        <button className={styles["account_button"]} onClick={disconnectWallet}>
                            Disconnect wallet
                        </button>
                    </div>
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/docs" element={<Docs/>}/>
                <Route path='/docs' component={() => {
                    window.location.href = 'https://txn-carbon-lbl.gitbook.io/txn-carbon/';
                    return null;
                }}/>
                <Route path="*" element={<Navigate replace to="/"/>}></Route>
            </Routes>
        </div>
    );
};

export default Main;