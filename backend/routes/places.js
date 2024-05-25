const express = require("express");
const axios = require("axios");
const City = require("../models/City");
const Location = require("../models/Location");
const router = express.Router();

// Fetch locations from OpenAI API and store in database
router.post("/fetch", async (req, res) => {
  const { cityName } = req.body;
  try {
    // Check if city exists
    let city = await City.findOne({ cityName });

    if (city) {
      // Fetch and return all locations for the existing city
      const locations = await Location.find({ cityId: city._id });

      return res.json({ _id: city._id, cityName: city.cityName, locations });
    } else {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Generate a list of 10 popular places to visit in ${cityName}. Provide the list in the following format:\n\n1. [Place Name] - [Description]\n2. [Place Name] - [Description]\n3. [Place Name] - [Description]\n4. [Place Name] - [Description]\n5. [Place Name] - [Description]\n6. [Place Name] - [Description]\n7. [Place Name] - [Description]\n8. [Place Name] - [Description]\n9. [Place Name] - [Description]\n10. [Place Name] - [Description]\n\nPlease ensure the descriptions are concise and informative.`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const locationsText = response.data.choices[0].message.content
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => line.trim());

      const locationData = locationsText
        .map((locationText) => {
          const match = locationText.match(/^(\d+\.\s*)(.*?)(\s+-\s+)(.*)$/);
          if (match) {
            const [_, name, , description] = match;
            return {
              name: name.trim(),
              description: description.trim(),
              cityName,
            };
          }
          return null;
        })
        .filter((location) => location !== null);

      // Save new city to the database
      city = new City({ cityName });
      await city.save();

      // Ensure city._id is correctly defined before inserting locations
      if (city && city._id) {
        const locations = await Location.insertMany(
          locationData.map((location) => ({ ...location, cityId: city._id }))
        );

        return res.json({ _id: city._id, cityName: city.cityName, locations });
      } else {
        throw new Error("City ID is not defined after saving the city");
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all cities
router.get("/cities", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all locations for a city
router.get("/locations/:cityId", async (req, res) => {
  try {
    const locations = await Location.find({ cityId: req.params.cityId });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get location details
router.get("/location/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate("cityId");
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a location
router.delete("/location/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
