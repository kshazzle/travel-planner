const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const placesRouter = require("./routes/places");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/places", placesRouter);

const PORT = process.env.PORT || 7789;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
