const express = require('express');
const app = express();
const deliveryRoutes = require('./routes/deliveryRoutes');

// Middlewares
app.use(express.json());

// Routes
app.use('/deliveries', deliveryRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});