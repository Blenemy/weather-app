import {
  ForecastData,
  WeatherForecastResponse,
} from "../types/weatherForecastResponse";

export const formattedDate = (hourlyData: WeatherForecastResponse) => {
  const formattedData = hourlyData.list.map((hour: ForecastData) => {
    const date = new Date(hour.dt * 1000);
    return {
      time:
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        ` (${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")})`,
      temp: hour.main.temp,
      exactTime: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  return formattedData;
};
