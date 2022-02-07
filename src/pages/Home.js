import styles from "./Home.module.css";
import {React, useEffect, useState} from "react";
import axios from "axios";
import BarChart from '../components/barChart/BarChart.js';

const Home = () => {
    const [data, setData] = useState(null);
    const [txnData, setTxnData] = useState(null);
    const [timestamps, setTimestamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dataa = [
        {year: 2019, sales: 8949000},
        {year: 2020, sales: 10979000},
        {year: 2021, sales: 9303000},
        {year: 2022, sales: 12979000},
    ]

    useEffect(() => {
        const getData = setInterval(async () => {
            try {
                const response = await axios.get(
                    `https://api.polygonscan.com/api?module=account&action=txlist&address=0x44F2C94Db9D49b53B2d59d19F0BE4Ec75BA00A85&startblock=0&endblock=999999999&page=1&offset=10&sort=asc&apikey=7EJW51Y7WBIPAJIP412WA9V7SK14QIUPHC`
                );
                console.log(response.data.result)
                for (let i = 0; i < response.data.result.length; i++){
                    let timestampsArr = timestamps;
                    timestampsArr[i] = response.data.result[i].timeStamp;
                    setTimestamps(timestampsArr);
                    // let a = JSON.parse(data);
                    // a.push({year: parseInt(timestampsArr[i]), sales: 1})
                }

                // console.log(timestamps[1])
                // let a = parseInt(timestamps[1])
                // let date = new Date(a)
                // console.log(date);
                // console.log(date.getMonth());
                setData(response.data.result.length);
                setTxnData(response.data.result);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }, 1500);

        return () => getData();
    }, []);

    return (
        <div className={styles["page_wrapper"]}>
            <div className={styles["section_wrapper"]}>
                Your Co2 footprint on Polygon is {data*0.0003+'kg'}<br/>
                <BarChart data={dataa}/>
            </div>
        </div>
    );
};

export default Home;