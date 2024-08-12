import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeatherItem from "./WeatherItem";

describe("WeatherItem", () => {
  it("renders WeatherItem with correct description, value, and icon", () => {
    const description = "Humidity";
    const value = "56%";
    const icon = "icon-url";

    render(<WeatherItem description={description} value={value} icon={icon} />);

    expect(screen.getByText(description)).toBeInTheDocument();

    expect(screen.getByText(value)).toBeInTheDocument();

    const imgElement = screen.getByAltText("Weather item icon");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", icon);
  });

  it("renders WeatherItem with correct structure", () => {
    const description = "Wind Speed";
    const value = "10 km/h";
    const icon = "icon-url";

    render(<WeatherItem description={description} value={value} icon={icon} />);

    const articleElement = screen.getByRole("article");
    expect(articleElement).toBeInTheDocument();

    const typographyElements = screen.getAllByText(/(Wind Speed|10 km\/h)/);
    expect(typographyElements.length).toBe(2);

    const imgElement = screen.getByAltText("Weather item icon");
    expect(imgElement).toBeInTheDocument();
  });
});
