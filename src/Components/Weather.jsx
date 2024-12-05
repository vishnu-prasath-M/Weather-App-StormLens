import React, { useState } from "react";
import logo from "../assets/St.png"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useNavigate } from "react-router-dom";





const mist = () => (
    <DotLottieReact className='w-64 max-sm:w-40'
        src="https://lottie.host/a5f9846d-5368-46ad-8c60-7ab15aa66931/ri05ZAkS5n.lottie"
        loop
        autoplay
    />
);

const clrsky = () => (
    <DotLottieReact className='w-64 max-sm:w-40'
        src="https://lottie.host/df4a574c-0fcf-430a-b86e-2679d6cdd3a1/yVBNmaQM38.lottie"
        loop
        autoplay
    />

);
const fclouds = () => (
    <DotLottieReact className='w-64 max-sm:w-40'
        src="https://lottie.host/76061e27-0992-43ea-86e1-06b6f043a1c4/C08VZp6FuC.lottie"
        loop
        autoplay
    />
);

const rain = () => (
    <DotLottieReact className='w-64 max-sm:w-40'
        src="https://lottie.host/90dc8731-a480-4584-baec-1d9098f3ad41/X0SXP5pdi0.lottie"
        loop
        autoplay
    />
);

const thunder = () => (
    <DotLottieReact className='w-64 max-sm:w-40'
        src="https://lottie.host/d520fcf1-cd7d-4874-9347-908d047f9e9f/vouJYBnqLX.lottie"
        loop
        autoplay
    />
);

const snow = () => (
    <DotLottieReact className='w-64 max-sm:w-40'
        src="https://lottie.host/722bad36-f46b-46b5-91ea-df62ab520aff/gwk656oBnX.lottie"
        loop
        autoplay
    />
);



const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [icon, setIcon] = useState("");

    const navigate =useNavigate();


    const API_KEY = "716d54a5a22d5c91a768edb2818d7c25"
    const weatherIcon = {
        "01d": clrsky,
        "01n": clrsky,
        "02d": fclouds,
        "02n": fclouds,
        "03d": fclouds,
        "03n": fclouds,
        "04d": fclouds,
        "04n": fclouds,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "11d": thunder,
        "11n": thunder,
        "13d": snow,
        "13n": snow,
        "50d": mist,
        "50n": mist,
    };

    function loginpage()
    {
        return(
            navigate("/login")
        )
        
    }

    const fetchWeather = async () => {
        setIsLoading(true);
        setError("");
        try {

            const currentResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=Metric`
            )

            if (!currentResponse.ok) throw new Error("City not found")
            const currentData = await currentResponse.json();
            setWeatherData(currentData);

            const weatherIconCode = currentData.weather[0].icon;
            setIcon(weatherIcon[weatherIconCode]);


            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=Metric`
            );
            const forecastData = await forecastResponse.json();


            const groupedForecast = groupByDay(forecastData.list);
            const nextThreeDays = Object.values(groupedForecast).slice(1, 4);
            setForecast(nextThreeDays);

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    const groupByDay = (data) => {
        return data.reduce((acc, item) => {
            const date = item.dt_txt.split(" ")[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});
    };

    const handleSearch = () => {
        if (city.trim() !== "") fetchWeather();
    };

    return (
        <div className="bg-black w-full min-h-screen bg-[url('../src/assets/bg3.jpg')] bg-cover bg-center max-sm:overflow-auto">

            <div className="flex justify-between p-1 bg-slate-200 shadow-2xl">
                <img className="w-36 ml-5 max-sm:w-24 " src={logo} alt="" />
                <button className="bg-green-600 hover:scale-95 p-1 mr-10 px-3 hover:bg-green-700 rounded-md text-white max-sm:text-sm max-sm:p-1.5" onClick={loginpage}>Login</button>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full p-2 ">
                    {/* Search Box */}
                    <div className="flex items-center bg-white shadow-md rounded-lg p-2 w-full max-w-md max-sm:w-4/5 max-sm:p-2 max-sm:h-11">
                        <input
                            type="text"
                            placeholder="Search Location"
                            className="flex-1 p-2 border-none outline-none bg-transparent"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-95 max-sm:w-fit max-sm:text-xs max-sm:h-9 max-sm:p-1"
                        >
                            Get Weather
                        </button>
                    </div>

                    {isLoading && <p className="mt-6 text-gray-500">Loading...</p>}
                    {error && <p className="mt-6 text-red-500">{error}</p>}

                    {/* Weather Details */}
                    {weatherData && (
                        <div className="mt-5 bg-slate-300 backdrop-blur-sm backdrop:filter bg-opacity-30 rounded-xl shadow-lg p-6 w-4/5 h-72">
                            {/* Current Weather */}
                            <h1 className="text-3xl font-bold text-center max-sm:text-xl">{weatherData.name}</h1>
                            <p className="text-center text-gray-600">
                                {weatherData.weather[0].description}
                            </p>


                            <div className="flex justify-around items-center mt-1 font-bold max-sm:gap-1 ">
                                <div className="flex max-sm:flex-col max-sm:items-center">
                                    <p className="text-6xl font-bold mt-12 max-sm:text-3xl">
                                        {Math.floor(weatherData.main.temp)}°C
                                    </p>

                                    {icon && (
                                        <div className="mt-5 flex justify-center max-sm:mt-2">
                                            <div className="w-48 h-48 max-sm:w-28">
                                                <span>{icon}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="max-sm:-mt-8 max-sm:text-sm">
                                    <p>Feels like: {Math.floor(weatherData.main.feels_like)}°C</p>
                                    <p>Humidity: {weatherData.main.humidity}%</p>
                                    <p>Wind: {weatherData.wind.speed} Km/h</p>
                                </div>
                            </div>

                            {/* 3-Day Forecast */}
                            <div className="mt-5 flex flex-col items-center w-full  max-sm:mt-0">
                                <h2 className="text-xl font-semibold mt-6 text-white">Next 3 Days</h2>
                                <div className="mt-4 gap-4 flex max-sm:flex-col">
                                    {forecast.map((day, index) => {
                                        const avgTemp =
                                            day.reduce((sum, item) => sum + item.main.temp, 0) / day.length;
                                        const midday = day.find((item) =>
                                            item.dt_txt.includes("12:00:00")
                                        );

                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col justify-between w-60 items-center bg-slate-300 backdrop-blur-lg bg-opacity-30 text-white  p-5 rounded-md shadow-2xl hover:scale-105 hover:bg-slate-300 hover:text-black"
                                            >
                                                
                                                <p className="font-semibold">
                                                    {new Date(day[0].dt_txt).toLocaleDateString("en-US", {
                                                        weekday: "long",
                                                    })}
                                                </p>
                                                <div>
                                                    <p className="font-bold ml-5">{Math.floor(avgTemp)}°C</p>
                                                    <p className="text-sm">
                                                        {midday ? midday.weather[0].description : "N/A"}
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    )}
                </div>

            </div>
        </div>
    );
};

export default WeatherApp