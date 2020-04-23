import { useState, useEffect } from 'react';

// Texas A&M geoservices
const gpsAPI = 'daf5d612b2a941c192b5efe4c81dcc96';
;

export function useInfo () {
    const [ username, setUsername ] = useState("Steve Miller");
    const [ zipcode, setZipcode ] = useState("22401");

    const changeTemp = (value: any) => {

    }

    // get the zipcode via latitude and longitude
    const getLocation = () => {
        // currently not working
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
            })
        }
    }

    return {
        changeTemp,
        getLocation,
        username,
        zipcode,
    }
}