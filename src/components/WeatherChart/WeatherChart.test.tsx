/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeatherChart from "./WeatherChart";
import { WeatherForecastResponse } from "../../types/weatherForecastResponse";
import { formattedDate } from "../../utils/formattedDate";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockHourlyData: WeatherForecastResponse = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1624390800,
      main: {
        temp: 25.6,
        feels_like: 25.7,
        temp_min: 24.3,
        temp_max: 26.1,
        pressure: 1013,
        humidity: 56,
        sea_level: 1015,
        grnd_level: 1013,
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      clouds: { all: 1 },
      wind: { speed: 3.5, deg: 150, gust: 5.5 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2021-06-22 09:00:00",
    },
  ],
  city: {
    id: 4930956,
    name: "Boston",
    coord: { lat: 42.3584, lon: -71.0598 },
    country: "US",
    population: 617594,
    timezone: -14400,
    sunrise: 1624360800,
    sunset: 1624411200,
  },
};

describe("WeatherChart", () => {
  it("renders the WeatherChart with correct data", () => {
    render(<WeatherChart hourlyData={mockHourlyData} />);

    expect(
      screen.getByText("3 hour interval forecast report")
    ).toBeInTheDocument();
  });

  it("correctly formats data using formattedDate", () => {
    const formattedData = formattedDate(mockHourlyData);

    expect(formattedData[0].temp).toBe(25.6);
    expect(formattedData[0].time).toMatch(/^\d{2}:\d{2} \(\d{2}\.\d{2}\)$/);
  });
});
