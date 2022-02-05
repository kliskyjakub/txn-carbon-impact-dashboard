import {createContext, useState} from "react";

export const WalletContext = createContext({
    currentAccount: "",
    setCurrentAccount() {
    },
});

export const WalletContextProvider = (props) => {
    const [currentAccount, setCurrentAccount] = useState("");

    return (
        <WalletContext.Provider value={{ currentAccount, setCurrentAccount }}>
            {props.children}
        </WalletContext.Provider>
    );
};