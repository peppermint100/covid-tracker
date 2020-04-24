import React, { useState, useEffect } from 'react';
import { Cards, Chart, CountryPicker } from "./components"
import { fetchData } from "./api";
import styles from "./App.module.css";
import img from "./img/img.png";

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
      <img className={styles.img} src={img} alt="logo" />
      <Cards data={data} /> <CountryPicker handleCountryChange={handleCountryChange} /> <Chart barData={data} country={country} /> </div>
  );
}
export default App;