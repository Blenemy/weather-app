import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";

import { getCitiesFromLocalStorage } from "./utils/weatherLocalStorage";
import { fetchCitiesWeather } from "./app/features/weatherSlice";

import WeaherApp from "./layout/WeaherApp";

import "./App.css";
import "./styles/_reset.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cities = getCitiesFromLocalStorage();

    if (cities.length > 0) {
      dispatch(fetchCitiesWeather(cities));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <WeaherApp />
    </div>
  );
}

export default App;
