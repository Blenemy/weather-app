import { useState } from "react";
import { TextField, Autocomplete, CircularProgress, Box } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";

import useFetchWeater from "../../hooks/useFetchWeater";
import { addCity, deleteCity } from "../../app/features/weatherSlice";

import {
  removeCityFromLocalStorage,
  saveCityToLocalStorage,
} from "../../utils/weatherLocalStorage";
import { WeatherResponse } from "../../types/WeatherResponse";

import WeatherDetails from "../WeatherDetails/WeatherDetails";

const SearchTab = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState<WeatherResponse | null>(
    null
  );
  const { isLoading, options } = useFetchWeater(inputValue);

  const handleCitySelect = (
    _: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    const cityData = options.find((option) => option.name === value);
    setSelectedCity(cityData || null);
  };

  const handleAddCity = () => {
    if (selectedCity) {
      setInputValue("");
      setSelectedCity(null);
      dispatch(addCity(selectedCity));
      saveCityToLocalStorage(selectedCity);
    }
  };

  const handleRemoveCity = () => {
    if (selectedCity) {
      dispatch(deleteCity(selectedCity));
      removeCityFromLocalStorage(selectedCity.name);
      setInputValue("");
      setSelectedCity(null);
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Autocomplete
          freeSolo
          options={options?.map((option: WeatherResponse) => option.name)}
          loading={isLoading}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={handleCitySelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Location..."
              variant="standard"
              color="info"
              autoFocus
              InputProps={{
                ...params.InputProps,
                style: {
                  fontSize: "24px",
                  color: "white",
                },
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              InputLabelProps={{
                style: { color: "white", fontSize: "24px" },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                  fontSize: "20px",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white",
                },
                "& .MuiAutocomplete-clearIndicator": {
                  color: "white",
                },
              }}
            />
          )}
        />
      </Box>

      {selectedCity && (
        <WeatherDetails
          selectedCity={selectedCity}
          handleAddCity={handleAddCity}
          handleRemoveCity={handleRemoveCity}
        />
      )}
    </Box>
  );
};

export default SearchTab;
