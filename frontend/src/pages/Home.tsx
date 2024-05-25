import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Divider,
  Paper,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import api from "../common/api";
import ListDetails from "../components/ListDetails";
import RecentLocation from "../components/RecentLocation";

interface City {
  _id: string;
  cityName: string;
}

interface Location {
  _id: string;
  name: string;
  description: string;
}

function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await api.get<City[]>("/api/places/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchLocations = async (cityId: string) => {
    try {
      const response = await api.get<Location[]>(
        `/api/places/locations/${cityId}`
      );
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleCityInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCityInput(event.target.value);
  };

  const handleCitySearch = async (cityInput: string) => {
    setCityInput(cityInput);
    setLocations([]);
    try {
      const response = await api.post("/api/places/fetch", {
        cityName: cityInput.toLowerCase(),
      });
      const { _id, cityName, locations } = response.data;
      setSelectedCity(_id);
      setLocations(locations);
      if (!recentCities.includes(cityName)) {
        setRecentCities([...recentCities, cityName]);
      }
    } catch (error) {
      console.error("Error fetching new city locations:", error);
    }
  };

  const handleDeleteCity = (city: string) => {
    setRecentCities(recentCities.filter((recentCity) => recentCity !== city));
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      paddingX={2}
      minHeight={"100%"}
    >
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        alignSelf={"flex-start"}
        flexDirection={"column"}
        width={"80%"}
        height={"100%"}
      >
        <Typography variant="h1">Discover the best of </Typography>
        <Box display={"flex"} width={"80%"} flexDirection={"row"}>
          <TextField
            label="Enter City"
            variant="outlined"
            fullWidth
            value={cityInput}
            onChange={handleCityInputChange}
            style={{ marginBottom: "16px", marginTop: "16px" }}
          />
          <IconButton
            color="info"
            size="large"
            onClick={() => handleCitySearch(cityInput)}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Divider style={{ margin: "16px 0" }} />

        {locations.map((loc) => (
          <ListDetails place={loc.name} description={loc.description} />
        ))}
      </Box>
      <Box flex={1} width={"18%"}>
        <Typography variant="h3">Recent Cities</Typography>

        {recentCities.map((city, index) => (
          <RecentLocation
            city={city}
            onPress={() => handleCitySearch(city)}
            onDelete={handleDeleteCity}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Home;
