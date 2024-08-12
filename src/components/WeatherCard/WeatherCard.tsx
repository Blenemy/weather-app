import React from "react";
import { Box, Typography } from "@mui/material";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { WeatherResponse } from "../../types/WeatherResponse";

interface WeatherCardProps {
  card: WeatherResponse;
  onClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ card, onClick }) => {
  return (
    <Box
      component="article"
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: 2.5,
        padding: 2.5,
        minWidth: "200px",
        minHeight: "320px",
        textAlign: "center",
        cursor: "pointer",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
      onClick={onClick}
    >
      <WeatherIcon icon={card.weather[0].icon} />
      <Typography variant="h3" sx={{ mt: 2 }}>
        {Math.round(card.main.temp)}°C
      </Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        {card.name}, {card.sys.country}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {card.main.humidity}%
          </Typography>
          <Typography variant="body2">Humidity</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {card.wind.speed} km/h
          </Typography>
          <Typography variant="body2">Wind Speed</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherCard;
