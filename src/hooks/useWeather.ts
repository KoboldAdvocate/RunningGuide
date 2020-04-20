import { useState, useEffect } from 'react';
import axios from 'axios';

const api = '';
const location = 'Fredericksburg,usa'
const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api}`;
export function useWeather() {
    const [temp, setTemp] = useState(72);
    const [weather, setWeather] = useState('Sunny');

    useEffect(() => {
    })

    // Use the openweathermap api to get the weather in the current area
    const getWeather = () => {
        return axios({
            url: endpoint,
            method: 'get'
        }).then(response => {
            // convert from kelvin to fahrenheit
            var temp = (response.data.main.temp - 273.15) * 1.8 + 21;
            temp = +temp.toFixed(0);
            setTemp(temp);
            setWeather(response.data.weather[0].main);
            return response.data;
        })
    };

    return {
        getWeather,
        temp,
        weather
    }
}
