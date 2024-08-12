import { Box, Fab } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { WeatherResponse } from "../types/WeatherResponse";
import { deleteCity } from "../app/features/weatherSlice";
import { removeCityFromLocalStorage } from "../utils/weatherLocalStorage";

import WeatherModal from "../components/WeatherModal/WeatherModal";
import SearchTab from "../components/SearchTab/SearchTab";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";

import bgImage from "../assets/bg-weather_thunder.png";

const WeatherApp = () => {
  const dispatch = useAppDispatch();
  const { selectedCities } = useAppSelector((state) => state.weather);

  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<WeatherResponse | null>(
    null
  );

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCity(null);
  };

  const handleOpenModal = (city: WeatherResponse | null) => {
    setSelectedCity(city);
    setOpen(true);
  };

  const removeCity = () => {
    if (selectedCity) {
      dispatch(deleteCity(selectedCity));
      removeCityFromLocalStorage(selectedCity.name);
      handleCloseModal();
    }
  };

  return (
    <Box component="main" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          background: `url(${bgImage}) center / cover no-repeat`,
          minHeight: "100vh",
          py: 12,
          pl: 6,
        }}
      >
        <Box>
          <Box
            component="section"
            sx={{
              width: "70%",
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {selectedCities.map((city) => (
              <WeatherCard
                card={city}
                key={city.name}
                onClick={() => handleOpenModal(city)}
              />
            ))}

            <Box
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => handleOpenModal(null)}
              >
                <AddIcon />
              </Fab>
            </Box>
          </Box>

          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            }}
          >
            <WeatherModal isOpen={isOpen} handleClose={handleCloseModal}>
              {selectedCity ? (
                <WeatherDetails
                  selectedCity={selectedCity}
                  handleRemoveCity={removeCity}
                />
              ) : (
                <SearchTab />
              )}
            </WeatherModal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherApp;
