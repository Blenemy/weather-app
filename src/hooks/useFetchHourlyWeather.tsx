import { useState, useEffect } from "react";

import { fetchHourlyWeatherData } from "../data-access/fetchWeatherData";
import { WeatherForecastResponse } from "../types/weatherForecastResponse";

const useFetchHourlyWeather = (cityName: string) => {
  const [hourlyData, setHourlyData] = useState<WeatherForecastResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchHourlyWeather = async () => {
    setIsLoading(true);
    try {
      const response = await fetchHourlyWeatherData(cityName);
      setHourlyData(response);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateHourlyReport = () => {
    fetchHourlyWeather();
  };

  useEffect(() => {
    handleUpdateHourlyReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName]);

  return { hourlyData, isLoading, handleUpdateHourlyReport };
};

export default useFetchHourlyWeather;
