import { useState, useEffect } from 'react';

export function useInfo () {
    const [ username, setUsername ] = useState("Steve Miller");
    const [ zipcode, setZipcode ] = useState("22401");

    useEffect(() => {

    });


    const changeTemp = (value: any) => {

    }


    return {
        changeTemp,
        username,
        zipcode,
    }
}