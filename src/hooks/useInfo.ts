import { useState, useEffect } from 'react';

export function useInfo () {
    const [ username, setUsername ] = useState("Steve Miller");
    const [ zipcode, setZipcode ] = useState("22401");
    const [ temp, setTemp ] = useState(72);
    const [ sun, setSun ] = useState("Sunny");

    useEffect(() => {
        console.log("1 " + temp);
    });

    const getGPS = () => {
    }

    const changeTemp = (value: any) => {
        setTemp(value);
        console.log("2 " + temp);
    }


    return {
        changeTemp,
        username,
        zipcode,
        temp,
        sun
    }
}