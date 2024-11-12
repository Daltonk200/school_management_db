// app.js
const PORT = process.env.PORT || 5000;
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// models..
require("./models/Course")
require("./models/User")

const authRoutes = require('./routes/authRoutes');
const authCourse = require('./routes/courseRoutes');

// Sample route for testing
app.use('/api/auth', authRoutes);
app.use('/api', authCourse);




app.all("*",(req,res)=>{
  res.status(404).json({
    message:"Route not Found"
  })
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
