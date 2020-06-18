const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

//Routes files
const touristsite = require('./routes/Touristsite');
const auth = require('./routes/authentication');
const regions = require('./routes/regions');

const connectDB = require('./config/db');
//Load env vars
dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/touristsites', touristsite);
app.use('/api/v1/auth', auth);
app.use('/api/v1/regions', regions);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} node on port ${PORT}`)
);
