const express = require("express");
const { getMe, login, logout, signup } = require("../controllers/authControllers.js");
const protectRoute = require("../middlewares/protectRoute.js");

const userRouter = express.Router();

userRouter.get("/me", protectRoute, getMe);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;
