import { useState, useEffect } from 'react';
import axios from 'axios';

// Texas A&M geoservices
const gpsAPI = '';
;

export function useInfo () {
    const [ username, setUsername ] = useState("Steve Miller");
    const [ zipcode, setZipcode ] = useState("22401");

    const api = ``;
    
    const changeTemp = (value: any) => {

    }

    // get the zipcode via latitude and longitude
    const getLocation = () => {
        // currently not working
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                const endpoint = `https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/HTTP/default.aspx?lat=${lat}&lon=${lon}&apikey=${api}&format=json&notStore=false&version=4.10`;
                console.log(endpoint);
                return axios({
                    url: endpoint,
                    method: 'get'
                }).then(response =>{
                    console.log(response.data.StreetAddresses[0].City);
                })
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
