import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WeatherResponse } from "../../types/WeatherResponse";
import WeatherCard from "./WeatherCard";

const mockCard: WeatherResponse = {
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
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
  wind: {
    speed: 3.5,
    deg: 150,
    gust: 5.5,
  },
  sys: {
    country: "US",
    sunrise: 1624360800,
    sunset: 1624411200,
    id: 1,
    type: 1,
  },
  name: "Boston",
  coord: {
    lat: 42.3584,
    lon: -71.0598,
  },
  dt: 1624390800,
  timezone: -14400,
  id: 4930956,
  base: "stations",
  visibility: 10000,
  clouds: {
    all: 1,
  },
  cod: 200,
};

describe("WeatherCard", () => {
  it("renders WeatherCard with correct data", () => {
    render(<WeatherCard card={mockCard} onClick={() => {}} />);

    expect(screen.getByText("26°C")).toBeInTheDocument();

    expect(screen.getByText("Boston, US")).toBeInTheDocument();

    expect(screen.getByText("56%")).toBeInTheDocument();
    expect(screen.getByText("Humidity")).toBeInTheDocument();

    expect(screen.getByText("3.5 km/h")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed")).toBeInTheDocument();
  });

  it("calls onClick when WeatherCard is clicked", () => {
    const handleClick = jest.fn();
    render(<WeatherCard card={mockCard} onClick={handleClick} />);

    const weatherCardElement = screen.getByRole("article");
    fireEvent.click(weatherCardElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
