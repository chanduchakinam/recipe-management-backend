const recipesRouter = require('./routes/recipe');
const express = require("express"); // Import express
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
require("dotenv").config();


mongoose.connect('mongodb://localhost:27017/recipes')
  .then(() => console.log("✅ Connected to Local MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const app = express();
app.use(express.json());
app.use(cors());

const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);
app.use("/api/recipes", recipesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));