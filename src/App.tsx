import React, { useState, useEffect } from 'react';
import { Chart, CountryPicker, Cards } from "./components"
import { fetchData } from "./api";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [data, setData] = useState();

  const [country, setCountry] = useState<string>("global");

  const handleCountryChange = (value: string) => {
    setCountry(value);
  }

  useEffect(() => {
    const fetching = async (country: string) => {
      const covid = await fetchData(country);
      setData(covid);
    }
    fetching(country);
  }, [country]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>코로나 19</h1>
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} /> <Chart barData={data} country={country} />
    </div>
  );
}
export default App;