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
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['rgba(255,0,0,0.5', 'rgba(0,255,0,0.5', 'rgba(0,0,255,0.5'],
                            data: [barData.confirmed.value, barData.recovered.value, barData.deaths.value]
                        }
                    ]
                }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` }
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
                            label: 'Infected',
                            borderColor: '#3333ff', // graph line color
                            fill: true, // fill color filling 
                        }, {
                            data: data.map((data) => data.deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
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