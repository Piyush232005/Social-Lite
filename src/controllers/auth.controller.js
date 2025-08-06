const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerController(req, res) {
    const { username, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ username });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const users = new userModel({ 
        username, 
        password 
    });

    await users.save(); // ✅ Save the user to DB

    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET);

    res.cookie('token', token); // ✅ Set cookie

    return res.status(201).json({ 
        message: 'User registered successfully',
        users
    });
}

async function loginController(req, res) {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie('token', token); // ✅ Set cookie

    return res.status(200).json({ 
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username
        }
    });
}

module.exports = {
    registerController,
    loginController
};
