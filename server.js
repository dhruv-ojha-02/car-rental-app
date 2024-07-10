const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Import connectDB function
const cors = require('cors');
const express = require('express');

dotenv.config();
connectDB(); // Call connectDB function to connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

// Define routes
app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

// Serve static files in production
// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
 })
 
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
