const express = require("express");
const protectRoute = require("../middlewares/protectRoute.js");

const {
    followUnfollowUser,
    getSuggestedUsers,
    getUserProfile,
    updateUser,
    getMultipleUserProfiles,
    searchUsers
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/profile/:username", protectRoute, getUserProfile);
userRouter.post("/follow/:id", protectRoute, followUnfollowUser);
userRouter.get("/suggested", protectRoute, getSuggestedUsers);
userRouter.post("/update", protectRoute, updateUser);
userRouter.post("/profiles", getMultipleUserProfiles);
userRouter.post("/search", protectRoute, searchUsers);


module.exports = userRouter;
