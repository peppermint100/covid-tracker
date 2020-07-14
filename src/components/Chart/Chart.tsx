import React, { useState, useEffect } from 'react'
import { fetchDaliyData } from '../../api/index';
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

interface dataProps {
    confirmed: number;
    deaths: number;
    recovered: number;
    reportDate: string;
}

interface Props {
    country: string;
    barData: barDataProps | undefined;
}

interface barDataProps {
    confirmed: dataDetailProps;
    deaths: dataDetailProps;
    recovered: dataDetailProps;
    lastUpdate: string
}
interface dataDetailProps {
    value: number;
    detail: string;
}
const Chart: React.FC<Props> = ({ barData, country }) => {
    const [data, setData] = useState<dataProps[]>([]);
    useEffect(() => {
        const getData = async () => {
            const covid = await fetchDaliyData();
            setData(covid);
        }
        getData();

    }, [country])


    const barChart = (
        barData
            ? (
                <Bar data={{
                    labels: ['감염', '회복', '사망'],
                    datasets: [
                        {
                            label: '사람 수',
                            backgroundColor: ['#e84118', '#44bd32', '#8c7ae6'],
                            data: [barData.confirmed.value, barData.recovered.value, barData.deaths.value]
                        }
                    ]
                }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `현재 선택된 국가는 ${country}입니다.` }
                    }} />
            ) : null
    )

    const LineChart = (
        data.length
            ? (
                // chartjs requirements : array of objects which contains ordered standard data
                <Line
                    data={{
                        labels: data.map(({ reportDate }) => reportDate), // array of rows
                        datasets: [{
                            data: data.map((data) => data.confirmed), // array of rows that matches with labels
                            label: '감염',
                            borderColor: '#e84118', // graph line color
                            fill: true, // fill color filling 
                        }, {
                            data: data.map((data) => data.deaths),
                            label: '사망',
                            borderColor: '#8c7ae6',
                            backgroundColor: '#8c7ae6',
                            fill: true,
                        },
                        ],
                    }}
                />
            ) :
            null
    )

    return (
        <div className={styles.container}>
            {country === "global" ? LineChart : barChart}
        </div>
    )
}

export default Chart;