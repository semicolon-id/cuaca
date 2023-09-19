import { Fragment } from "react";

import Weather from "../weather/weather";
import { useState, useEffect } from "react";

const Region = () => {
  const [countryList, setCountryList] = useState([]);
  const [search, setsearch] = useState("");
  const [suggestedCountries, setSuggestedCountries] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Ambil nama negara dari data
        const countryNames = data.map((country) => country.name.common);
        setCountryList(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  }, []);

  const [currentWeather, setcurrentWeather] = useState({
    suhu: 37,
    kota: "Indonesia",
    feels_like: 35,
    cuaca: "berawan",
    desc: "sebagian berawan",
    icon: "03d",
    angin: 2,
    humidity: 34,
    negara: "ID",
    lat: -6.9039,
    lon: 107.6186,
  });

  useEffect(() => {
    if (currentWeather.lat && currentWeather.lon) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currentWeather.lat}&lon=${currentWeather.lon}&appid=70986ea4f147ddf77de19ee38779797a`
      )
        .then((res) => res.json())
        .then((result) => {
          setForecastData(result.list); // Menyimpan data cuaca forecast
        });
    }
  }, [currentWeather]);

  const searchHandler = (e) => {
    e.preventDefault();

    if (search !== "") {
      const filteredCountries = countryList.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
      );

      setSuggestedCountries(filteredCountries);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=70986ea4f147ddf77de19ee38779797a&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === 200) {
            setcurrentWeather({
              suhu: result.main.temp,
              kota: result.name,
              feels_like: result.main.feels_like,
              cuaca: result.weather[0].main,
              desc: result.weather[0].description,
              icon: result.weather[0].icon,
              angin: result.wind.speed,
              humidity: result.main.humidity,
              negara: result.sys.country,
              lon: result.coord.lon,
              lat: result.coord.lat,
            });
          } else {
            alert("Country not found.");
          }
        });
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString(); // Format: YYYY-MM-DDTHH:mm
  };

  const getNearestForecasts = () => {
    if (forecastData.length > 0) {
      const currentDateTime = getCurrentDate();
      const nearestForecasts = forecastData.filter(
        (forecast) => forecast.dt_txt > currentDateTime
      );
      return nearestForecasts.slice(0, 4); // Ambil 4 data terdekat
    }
    return [];
  };

  return (
    <Fragment>
      <div className="mb-3/4 sm:mb-0">{/* <Nav></Nav> */}</div>
      <div className=" flex w-full justify-center place-content-around  items-center ">
        <div className="flex flex-col  md:flex overflow-hidden shadow-lg w-11/12 h-auto mt-3 mb-0">
          <div className="w-full h-12 bg-sky-700 flex items-center justify-center pr-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter country name"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                  setSuggestedCountries([]);
                }}
                className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={searchHandler}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Search
              </button>
            </div>

            {suggestedCountries.length > 0 && (
              <ul className="absolute mt-10 py-2 bg-white border border-gray-300 rounded-md shadow-md">
                {suggestedCountries.map((country, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-row md:shrink-0  bg-blue-600">
            <div className="flex-col gap-10  md:flex w-3/5 p-5 ">
              <div className="text-left  text-gray-200 ml-5 py-2">
                <h1 className="text-5xl  mb-3">{currentWeather.kota}</h1>
                <p className="text-lg pb-1">Wed 22 August</p>
                <hr class="mr-5 h-px my-2  border-0 dark:bg-gray-300" />
                <h1 className="text-7xl">{currentWeather.suhu}°C</h1>
                <p className="text-base ">
                  feels like {currentWeather.feels_like}°C
                </p>
                <div className="flex my-2 ">
                  <img
                    className="w-14 h-14"
                    src={`http://openweathermap.org/img/w/${currentWeather.icon}.png`}
                    alt=""
                  />
                  <h4 className="p1-2 text-lg ">
                    {currentWeather.cuaca} or {currentWeather.desc}
                  </h4>
                </div>

                <hr class="mr-5 h-px mt-3 py- border-0 dark:bg-gray-300" />
                <p className="text-sm mt-2">
                  Wind: {currentWeather.angin} km/h
                </p>
                <p className="text-sm ">Humidity: {currentWeather.humidity}%</p>
              </div>
            </div>

            <div className="flex  items-center md:shrink-0 justify-center px-2  bg-blue-700 w-2/5">
              <img
                className="h-1/2 md:w-32 lg:w-48"
                src={`https://www.countryflagicons.com/FLAT/64/${currentWeather.negara}.png`}
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-full bg-white px-2 py-1 flex flex-wrap   ">
            {getNearestForecasts().map((forecast, index) => (
              <Weather
                key={index}
                img={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                hari={forecast.dt_txt}
                desc={forecast.weather[0].description}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Region;
