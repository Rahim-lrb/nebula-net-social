const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        // httpOnly: true, // prevent XSS attacks
        sameSite: "none", // prevent CSRF attacks
        secure: true,
    });
};

module.exports = generateTokenAndSetCookie;
