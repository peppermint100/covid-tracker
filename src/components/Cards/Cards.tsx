import React, { ReactElement } from 'react'
import styles from "./Cards.module.css"
import CountUp from "react-countup";
import cx from "classnames";

interface Props {
    data: any;
}

export default function Cards({ data }: Props): ReactElement {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={cx(styles.card)}>
                    <div className={cx(styles.header, styles.infected)}>
                        감염
                    </div>
                    <div className={styles.content}>
                        <p className={styles.numbers}>
                            {data && data.confirmed.value !== undefined ? <CountUp start={0} end={data.confirmed.value} duration={2} /> : "Loading..."}
                        </p>
                        <p className={styles.date} >
                            {data ? <p>{new Date(data.lastUpdate).toDateString()}</p> : "Loading..."}
                        </p>
                        <p className={styles.info}>
                            코로나 감염 인원 수
                    </p>
                    </div>
                </div>
                <div className={cx(styles.card)}>
                    <div className={cx(styles.header, styles.recovered)}>
                        회복
                    </div>
                    <div className={styles.content}>
                        <p className={styles.numbers}>
                            {data && data.recovered.value !== undefined ? <CountUp start={0} end={data.recovered.value} duration={2} /> : "Loading..."}
                        </p>
                        <p className={styles.date} >
                            {data ? <p>{new Date(data.lastUpdate).toDateString()}</p> : "Loading..."}
                        </p>
                        <p className={styles.info}>
                            코로나 회복 인원 수
                    </p>
                    </div>
                </div>
                <div className={cx(styles.card)}>
                    <div className={cx(styles.header, styles.deaths)}>
                        사망
                    </div>
                    <div className={styles.content}>
                        <p className={styles.numbers}>
                            {data && data.deaths.value !== undefined ? <CountUp start={0} end={data.deaths.value} duration={2} /> : "Loading..."}
                        </p>
                        <p className={styles.date} >
                            {data ? <p>{new Date(data.lastUpdate).toDateString()}</p> : "Loading..."}
                        </p>
                        <p className={styles.info}>
                            코로나 사망 인원 수
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
