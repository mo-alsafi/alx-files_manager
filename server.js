import express from 'express';
import { json } from 'express';
import router from './routes/index.js'; // Importing routes

// Create the express app
const app = express();

// Middleware to parse JSON
app.use(json());

// Use the routes from routes/index.js
app.use(router);

// Get the port from the environment variable or default to 5000
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

