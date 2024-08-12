import axios from "axios";

import { WeatherResponse } from "../types/WeatherResponse";
import { weatherApi } from "../constants/weather";
import { WeatherForecastResponse } from "../types/weatherForecastResponse";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = async (
  query: string
): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(
    `${weatherApi.baseUrl}weather?q=${query}&units=metric&appid=${apiKey}`
  );
  return response.data;
};

export const fetchHourlyWeatherData = async (
  query: string
): Promise<WeatherForecastResponse> => {
  const response = await axios.get<WeatherForecastResponse>(
    `${weatherApi.baseUrl}forecast?q=${query}&appid=${apiKey}&units=metric`
  );
  return response.data;
};
