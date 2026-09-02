const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
// Authentication routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "CRM Backend API is running",
  });
});

module.exports = app;