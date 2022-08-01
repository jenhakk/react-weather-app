import React, { useState } from "react";
import "./App.css";
import { apikey, citysearch, current } from "./constants.js";

function App() {
  const [city, setCity] = useState("");
  const [details, setDetails] = useState({});
  const [weather, setWeather] = useState({});
  const [iconSrc, setIconSrc] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${citysearch}cities/search?apikey=${apikey}&q=${city}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result[0].Key);
          setDetails(result[0]);

          fetch(`${current}${result[0].Key}?apikey=${apikey}`)
            .then((res) => res.json())
            .then((result) => {
              setWeather(result[0]);
              console.log(result[0]);
              setIconSrc(`/icons/${result[0].WeatherIcon}.png`);
              console.log(result[0].IsDayTime);
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getTime = () => {
    let today = new Date();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return `${time}`;
  };

  return (
    <div
      className={
        typeof weather.WeatherText != "undefined"
          ? weather.IsDayTime
            ? weather.Temperature.Metric.Value < 0
              ? "winter app"
              : "app"
            : "app night"
          : "app"
      }
    >
      <main>
        <div className={typeof weather.WeatherText != "undefined" ? "box" : ""}>
          <div className="top-box">
            <div className="header">Welcome to Weather App</div>
            <div className="start">
              Check current weather of the chosen city
            </div>
          </div>

          <div className="search">
            <input
              className="search-field"
              placeholder="Enter city.."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={search}
            />
          </div>

          {typeof details.Key != "undefined" ? (
            <div>
              <div className="location">
                <div className="cityname">
                  {details.LocalizedName}, {details.Country.LocalizedName}
                </div>
                <div className="date">
                  {dateBuilder(new Date())} {getTime(new Date())}
                </div>
                <div className="time"></div>
              </div>
            </div>
          ) : ("")}

          {typeof weather.WeatherText != "undefined" ? (
            <div>
              <div className="weather">
                <div className="temperature">
                  {Math.round(weather.Temperature.Metric.Value)}°C
                </div>
                <div className="conditions">
                  {weather.WeatherText} {weather.IsDayTime}
                </div>
                <div className="icon-box">
                  {" "}
                  <img className="icon" src={iconSrc} alt="weathericon" />
                </div>
              </div>
            </div>
          ) : ("")}
        </div>
      </main>
    </div>
  );
}

export default App;
