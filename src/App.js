import React, { useEffect, useState } from "react";
import axios from "axios";
// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("tunis");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }
    const input = document.querySelector("input");
    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    input.value = "";

    e.preventDefault();
  };

  const APIkey = "2d3b28b81242b2dfb8c79d06268c2b1a";
  // fetch data
  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios
      .get(url)
      .then((res) => {
        {
          setTimeout(() => {
            setData(res.data);
            setLoading(false);
          }, 1500);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [error]);
  // spinner
  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="animate-spin text-5xl text-white" />
        </div>
      </div>
    );
  }

  // icons
  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  // date object
  const date = new Date();
  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/* error */}
      {error && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-4 p-4 capitalize rounded-md">
          <p>{error.response.data.message}</p>
        </div>
      )}
      {/* form */}
      <form
        className={`${
          animate ? "animate-shake" : ""
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 mt-4`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="w-[80%] bg-transparent text-white outline-none placeholder:text-white text-[15px] font-light ml-2 lg:ml-6 h-full"
            type="text"
            onChange={(e) => handleInput(e)}
            placeholder="Search by city or country"
          />
          <button
            className="bg-[#1ab8ed] hover:bg-[#15abdd] min-w-20 h-12 rounded-full flex justify-center items-center transition"
            onClick={(e) => handleSubmit(e)}
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>

      {/* Card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="animate-spin text-5xl text-white" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex items-center gap-x-5">
              {/* icon */}
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name */}
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>

                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>

            {/* card body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* temperature */}
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>

                {/* Celsius */}
                <div className="text-4xl font-medium">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description */}
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>

            {/* card bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind{" "}
                    <span className="ml-2">
                      {parseInt(data.wind.speed) * 3.6} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
