import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper } from "@mui/material";
import api from "../common/api";

interface Location {
  _id: string;
  name: string;
  description: string;
}

function LocationDetails() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocationDetails();
  }, []);

  const fetchLocationDetails = async () => {
    try {
      const response = await api.get<Location>(`/api/places/location/${id}`);
      setLocation(response.data);
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/places/location/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h4">Location Details</Typography>
      {location && (
        <div>
          <Typography variant="h5">{location.name}</Typography>
          <Typography variant="body1">{location.description}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            style={{ marginTop: "16px" }}
          >
            Delete
          </Button>
        </div>
      )}
    </Paper>
  );
}

export default LocationDetails;
