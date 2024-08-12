import { Box, Button, Typography } from "@mui/material";
import { updateCity } from "../../app/features/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { saveCityToLocalStorage } from "../../utils/weatherLocalStorage";
import { WeatherResponse } from "../../types/WeatherResponse";
import { hasSelectedCity } from "../../utils/hasSelectedCity";
import useFetchWeater from "../../hooks/useFetchWeater";
import useFetchHourlyWeather from "../../hooks/useFetchHourlyWeather";

import WeatherIcon from "../WeatherIcon/WeatherIcon";
import WeatherItem from "../WeatherItem/WeatherItem";
import WeatherChart from "../WeatherChart/WeatherChart";

import maxTempIcon from "../../assets/maxTemp.svg";
import minTempIcon from "../../assets/minTemp.svg";
import humidityIcon from "../../assets/humidity.svg";
import cloudinessIcon from "../../assets/cloudiness.svg";
import windIcon from "../../assets/windSpeed.svg";

interface WeatherDetailsProps {
  selectedCity: WeatherResponse;
  handleAddCity?: () => void;
  handleRemoveCity?: () => void;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  selectedCity,
  handleAddCity,
  handleRemoveCity,
}) => {
  const dispatch = useAppDispatch();
  const { selectedCities } = useAppSelector((state) => state.weather);
  const { refreshWeatherData } = useFetchWeater(selectedCity.name);
  const { hourlyData } = useFetchHourlyWeather(selectedCity.name);

  const updateWeatherReport = async () => {
    const updatedCity = await refreshWeatherData();

    if (updatedCity) {
      dispatch(updateCity(updatedCity));
      saveCityToLocalStorage(updatedCity);
    }
  };

  const weatherItems = [
    {
      description: "Temp max",
      value: `${selectedCity.main.temp_max}°`,
      icon: maxTempIcon,
    },
    {
      description: "Temp min",
      value: `${selectedCity.main.temp_min}°`,
      icon: minTempIcon,
    },
    {
      description: "Humidity",
      value: `${selectedCity.main.humidity}%`,
      icon: humidityIcon,
    },
    {
      description: "Cloudiness",
      value: `${selectedCity.clouds.all}%`,
      icon: cloudinessIcon,
    },
    {
      description: "Wind",
      value: `${selectedCity.wind.speed} km/h`,
      icon: windIcon,
    },
  ];

  return (
    <Box mt={1}>
      <Typography mb={1} variant="h5">
        Weather details...
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            {selectedCity.name}, {selectedCity.weather[0].main},{" "}
            {selectedCity.weather[0].description}
          </Typography>
          <WeatherIcon icon={selectedCity.weather[0].icon} />
        </Box>

        {weatherItems.map((item, index) => (
          <WeatherItem
            key={index}
            description={item.description}
            value={item.value}
            icon={item.icon}
          />
        ))}

        {hourlyData && <WeatherChart hourlyData={hourlyData} />}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {handleAddCity && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCity}
              disabled={hasSelectedCity(selectedCity, selectedCities)}
              sx={{
                "&.Mui-disabled": {
                  backgroundColor: "rgba(63, 81, 181, 0.5)",
                  color: "white",
                },
              }}
            >
              Add city
            </Button>
          )}

          {hasSelectedCity(selectedCity, selectedCities) && (
            <Button
              variant="contained"
              color="warning"
              onClick={handleRemoveCity}
            >
              Delete city
            </Button>
          )}

          {hasSelectedCity(selectedCity, selectedCities) && (
            <Button
              variant="contained"
              color="info"
              onClick={updateWeatherReport}
            >
              Refresh data
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherDetails;
