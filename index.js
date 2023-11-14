// Importing necessary modules and packages
const express = require("express");

const app = express();

const database = require("./config/database");
const productRoutes = require("./route/Product");
const addressroute = require("./route/Address");
const cartRoute = require("./route/Cart");

const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./route/User");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Setting up routes
app.use("/api/product/", productRoutes);
app.use("/api/auth/", router);
app.use("/api/address/", addressroute);
app.use("/api/cart/", cartRoute);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

// End of code.
