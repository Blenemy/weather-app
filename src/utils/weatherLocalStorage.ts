import { WeatherResponse } from "../types/WeatherResponse";

const STORAGE_KEY = "weatherAppCities";

export const getCitiesFromLocalStorage = (): WeatherResponse[] => {
  const cities = localStorage.getItem(STORAGE_KEY);
  return cities ? JSON.parse(cities) : [];
};

export const saveCityToLocalStorage = (city: WeatherResponse): void => {
  const cities = getCitiesFromLocalStorage();
  const cityIndex = cities.findIndex((c) => c.id === city.id);

  if (cityIndex !== -1) {
    cities[cityIndex] = city;
  } else {
    cities.push(city);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
};

export const removeCityFromLocalStorage = (cityName: string): void => {
  const cities = getCitiesFromLocalStorage();
  const updatedCities = cities.filter((city) => city.name !== cityName);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCities));
};
