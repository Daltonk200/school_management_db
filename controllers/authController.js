// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// Register a new user
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
      console.log(existingUser);
      
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role
      });
  
      await user.save();
  
      // Generate JWT token
      const token = await jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ message: 'User registered successfully', token: token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



// Login and generate JWT
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT
    const token = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ error: false,
       message: 'Login successful.',
       token:token
      });

  } catch (error) {
    res.status(500).json({ message: 'Failed to login' });
  }
};
 module.exports ={register,login}