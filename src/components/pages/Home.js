import styles from "./Home.module.css";
import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className={styles["page_wrapper"]}>
            <a href="#" className="main">
                {/*<img src={logo} className={styles["logo"]} alt="Logo"/>*/}
                txn carbon impact dashboard
            </a>
            <div className={styles["section_seperator"]}></div>

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

            <div className={styles["section_seperator"]}></div>
            <div className={styles["section_wrapper"]}>
                -- data dashboards--<br/>
            </div>
        </div>
    );
};

export default Home;