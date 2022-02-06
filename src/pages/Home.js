import styles from "./Home.module.css";
import React from "react";
import {Link} from "react-router-dom";
// import { websocketClient } from "@polygon.io/client-js";
// const stocksWS = websocketClient("7EJW51Y7WBIPAJIP412WA9V7SK14QIUPHC").stocks();

const Home = () => {
    // const getPolygonData = async () => {
    //     stocksWS.onmessage = ({data}) => {
    //         const [message] = JSON.parse(data);
    //
    //         stocksWS.send('{"action":"subscribe", "params":"AM.MSFT,A.MSFT"}');
    //
    //         switch (message.ev) {
    //             case "AM":
    //                 // your trade message handler
    //                 break;
    //             case "A":
    //                 // your trade message handler
    //                 break;
    //         }
    //     };
    //
    //     stocksWS.send({ action: "subscribe", params: "T.MSFT" });
    //     console.log(stocksWS);
    // }
    // getPolygonData();
    return (
        <div className={styles["page_wrapper"]}>
            <div>
                <Link to="/" style={{
                    display: 'inline', paddingLeft: '15px',
                    paddingRight: '15px'
                }}>Home</Link>
                <Link to="/docs" style={{
                    display: 'inline', paddingLeft: '15px',
                    paddingRight: '15px'
                }}>Docs</Link>
            </div>

            <div className={styles["section_wrapper"]}>
                -- data dashboards--<br/>
            </div>
        </div>
    );
};

export default Home;