import React, { useState, FunctionComponent } from 'react';
import "./WeatherReport.css";
import axios from 'axios';
interface WeatherProps {
    currLocation: String
    currTemp: Number,
    sun: String
}

export const WeatherReport: FunctionComponent <WeatherProps> = ({ currLocation, currTemp, sun }) => {

    const [temp, setTemp] = useState(72);
    const [weather, setWeather] = useState('Sunny');

    const api = '';
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${currLocation}&APPID=${api}`;

    // Use the openweathermap api to get the weather in the current area
    const getWeather = () => {
        return axios({
            url: endpoint,
            method: 'get'
        }).then(response => {
            // convert from kelvin to fahrenheit
            var temp = ((response.data.main.temp - 273.15) * 1.8 + 32);
            temp = +temp.toFixed(0);
            setTemp(temp);
            setWeather(response.data.weather[0].main);
        })
    };

    const runCalculate = () => {
        getWeather();
        var run = "default";
        var image = "/assets/weather/sunny.png";
        if (temp >= 50 && temp < 90) {
            if (weather === "Clear") {
                run = "It's a great time to run!";
            } else if (weather === "Clouds") {
                run = "No need to run with sunglasses";
                image = "/assets/weather/cloudy.jpg";
            }
        } else if (temp >= 32 && temp < 50) {
            if (weather === "Clear") {
                run = "You can run, but dress warmly!";
            } else {
                run = "Your run might be a little chilly";
            }
        } else if (temp < 32) {
            run = "Wear layers if you really have to run!";
        } else {
            run = "It's hot, so hydrate if you really want to run!";
        }

        if (weather === "Rain") {
            image = "/assets/weather/rain.jpeg";
        }

        return (
            <div>
                <p>Conditions in {currLocation}</p>
                {temp} and {weather}
                <p>{run}</p>
                <br />
                <img width="50%" src={image} alt="Running Weather" />
            </div>
        )
    }

    return (
        <div>
            {runCalculate()}
        </div>
    );
};