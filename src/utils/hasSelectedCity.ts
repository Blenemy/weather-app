import { WeatherResponse } from "../types/WeatherResponse";

export const hasSelectedCity = (
  city: WeatherResponse,
  selectedCities: WeatherResponse[]
): boolean => {
  return !!selectedCities.find((item) => item.name === city.name);
};
