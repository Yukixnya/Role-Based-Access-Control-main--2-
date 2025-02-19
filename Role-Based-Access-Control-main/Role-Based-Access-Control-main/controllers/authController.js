const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/userModel");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log("1");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("2");
        const newUser = await createUser({ username, password: hashedPassword, role });
        console.log("3");
        res.status(201).json({ message: `User registered with username ${newUser.username}` });
        console.log("4");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET, // Secret key from environment variable
            { expiresIn: "1h" } // Token validity duration
        );

        console.log(`Token for user ${username}: ${token}`); // Print token to console

        res.status(200).json({
            message: `Login successful for user ${username}`,
            token, // Include token in response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    register,
    login,
};
