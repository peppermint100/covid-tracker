import axios from "axios";

const URL: string = "https://covid19.mathdro.id/api";

interface dataProps {
    confirmed: number;
    recovered: number;
    deaths: number;
    lastUpdate: string;
}

export const fetchData = async (country: string) => {
    let appendedURL = URL;
    if (country !== "global") {
        appendedURL = URL + `/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(appendedURL);

        const modifiedData: dataProps = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        return modifiedData;
    } catch (err) {
        return err;
    }
}

interface dailyDataProps {
    confirmed: number;
    deaths: number;
    reportDate: string;
}

export const fetchDaliyData = async () => {
    try {
        const { data } = await axios.get(`${URL}/daily`);
        const modifiedData: dailyDataProps[] = data.map((d: any) => ({
            confirmed: d.confirmed.total,
            deaths: d.deaths.total,
            reportDate: d.reportDate
        }))
        return modifiedData;
    } catch (err) {
        return err;
    }
}

interface countryData {
    name: string;
    iso2: string;
    iso3: string;
}
export const fetchCountryData = async () => {
    try {
        const { data } = await axios.get(`${URL}/countries`);
        const modifiedData: string[] = data.countries.map((country: countryData) => country.name);
        return modifiedData;
    } catch (err) {
        return err;
    }
}