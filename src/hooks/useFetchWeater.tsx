import { useEffect, useState } from "react";
import { debounce } from "lodash";

import { WeatherResponse } from "../types/WeatherResponse";
import { fetchWeatherData } from "../data-access/fetchWeatherData";

const useFetchWeater = (inputValue: string) => {
  const [options, setOptions] = useState<WeatherResponse[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchCityWeather = async (
    query: string
  ): Promise<WeatherResponse | undefined> => {
    setLoading(true);
    try {
      const weatherData = await fetchWeatherData(query);
      setOptions([weatherData]);
      return weatherData;
    } catch (error) {
      console.error("Error fetching city weather:", error);
    } finally {
      setLoading(false);
    }
    return undefined;
  };

  const debouncedFetchCities = debounce((value: string) => {
    if (value) {
      fetchCityWeather(value);
    }
  }, 1000);

  useEffect(() => {
    debouncedFetchCities(inputValue);
    return () => {
      debouncedFetchCities.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const refreshWeatherData = async (): Promise<WeatherResponse | undefined> => {
    if (inputValue) {
      return await fetchCityWeather(inputValue);
    }
    return undefined;
  };

  return { isLoading, options, refreshWeatherData };
};

export default useFetchWeater;
