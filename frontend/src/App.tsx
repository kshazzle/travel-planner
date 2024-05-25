import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LocationDetails from "./components/LocationDetails";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Travel Planning App</Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
