import React, {useContext, useEffect} from "react";
import "./App.css";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import {WalletContext} from "./store/WalletContext";

const App = () => {
  const {currentAccount, setCurrentAccount} = useContext(WalletContext);

  const checkIfWalletIsConnected = async () => {
    const {ethereum} = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({method: "eth_accounts"});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return <>{!currentAccount ? <Landing/> : <Main/>}</>;
};

export default App;
