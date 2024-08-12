import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherResponse } from "../../types/WeatherResponse";
import { fetchWeatherData } from "../../data-access/fetchWeatherData";

interface WeatherState {
  selectedCities: WeatherResponse[];
}

const initialState: WeatherState = {
  selectedCities: [],
};

export const fetchCitiesWeather = createAsyncThunk(
  "weather/fetchCitiesWeather",
  async (cities: WeatherResponse[]) => {
    const updatedCities = await Promise.all(
      cities.map(async (city) => {
        return fetchWeatherData(city.name);
      })
    );
    return updatedCities;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCities(state, action: PayloadAction<WeatherResponse[]>) {
      state.selectedCities = action.payload;
    },
    addCity(state, action: PayloadAction<WeatherResponse>) {
      const cityExists = state.selectedCities.find(
        (city) => city.id === action.payload.id
      );

      if (!cityExists) {
        state.selectedCities.push(action.payload);
      }
    },
    deleteCity(state, action: PayloadAction<WeatherResponse>) {
      state.selectedCities = state.selectedCities.filter(
        (city) => city.name !== action.payload.name
      );
    },
    updateCity(state, action: PayloadAction<WeatherResponse>) {
      const index = state.selectedCities.findIndex(
        (city) => city.id === action.payload.id
      );

      if (index !== -1) {
        state.selectedCities[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCitiesWeather.fulfilled, (state, action) => {
      state.selectedCities = action.payload;
    });
  },
});

export const { addCity, deleteCity, setCities, updateCity } =
  weatherSlice.actions;
export default weatherSlice.reducer;
