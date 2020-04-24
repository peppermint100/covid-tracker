import React, { useState, useEffect } from 'react'
import { fetchCountryData } from '../../api/index';
import { FormControl, NativeSelect } from "@material-ui/core";


interface Props {
    handleCountryChange: (value: string) => void;
}
const CountryPicker: React.FC<Props> = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState<string[]>([]);
    useEffect(() => {
        const fetchCountries = async () => {
            setCountries(await fetchCountryData());
        }
        fetchCountries();
    }, [])

    return (
        <FormControl >
            <NativeSelect onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { handleCountryChange(e.target.value) }}>
                <option value="global">Global</option>
                {countries.length ? (
                    countries.map((country, i) => {
                        return (
                            <option value={country} key={i}>{country}</option>
                        )
                    })
                ) : null}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;