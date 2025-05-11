const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};


// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        res.status(401);
        throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid credentials');
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });
});

module.exports = {
    registerUser,
    loginUser
};