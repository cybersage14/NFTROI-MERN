const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
connectDB();
// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/wallet', require('./routes/api/wallet'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// }

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
