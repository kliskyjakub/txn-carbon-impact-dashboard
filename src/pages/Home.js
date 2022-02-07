import styles from "./Home.module.css";
import {React, useEffect, useState} from "react";
import axios from "axios";
import BarChart from '../components/barChart/BarChart.js';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const Home = () => {
    const [data, setData] = useState(null);
    const [txnData, setTxnData] = useState(null);
    const [timestamps, setTimestamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dataa = [
        {year: 1980, sales: 8949000},
        {year: 1985, sales: 10979000},
        {year: 1990, sales: 9303000},
        {year: 1991, sales: 8185000},
        {year: 1992, sales: 8213000},
        {year: 1993, sales: 8518000},
    ]

        // const getCo2 = async (txnData) => {
            // console.log(num_txn * 0.0003)
            // let blockNumber = txnData.blockNumber;
            // console.log(blockNumber);
            //
            // const getBlockData = async () => {
            //     try {
            //         const response = await axios.get(
            //             `https://api.polygonscan.com/api?module=block&action=getblockreward&blockno=` + blockNumber + `&apikey=7EJW51Y7WBIPAJIP412WA9V7SK14QIUPHC`
            //         );
            //         let blockMiner = response.data.result.blockMiner;
            //         console.log(blockMiner);
            //
            //         const getTotalBlocksData = async () => {
            //             try {
            //                 const response = await axios.get(
            //                     `https://api.polygonscan.com/api?module=account&action=getminedblocks&address=`+blockMiner+`&blocktype=blocks&startblock=10000000&apikey=7EJW51Y7WBIPAJIP412WA9V7SK14QIUPHC`
            //                 );
            //                 console.log(response.data.result)
            //                 setError(null);
            //             } catch (err) {
            //                 setData(null);
            //             } finally {
            //                 setLoading(false);
            //             }
            //         };
            //         getTotalBlocksData()
            //         setError(null);
            //     } catch (err) {
            //         setData(null);
            //     } finally {
            //         setLoading(false);
            //     }
            // };
            // getBlockData();
            // console.log("------");
        // }

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
                }

                console.log(new Date(timestamps[0]).getMonth());
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