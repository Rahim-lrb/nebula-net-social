const express = require("express");
const protectRoute = require("../middlewares/protectRoute.js");
const {
    commentOnPost,
    createPost,
    deletePost,
    getAllPosts,
    getFollowingPosts,
    getLikedPosts,
    getUserPosts,
    likeUnlikePost
} = require("../controllers/postControllers.js");

const postRouter = express.Router();

postRouter.get("/all", protectRoute, getAllPosts);
postRouter.get("/following", protectRoute, getFollowingPosts);
postRouter.get("/likes/:id", protectRoute, getLikedPosts);
postRouter.get("/user/:username", protectRoute, getUserPosts);
postRouter.post("/create", protectRoute, createPost);
postRouter.post("/like/:id", protectRoute, likeUnlikePost);
postRouter.post("/comment/:id", protectRoute, commentOnPost);
postRouter.delete("/:id", protectRoute, deletePost);

module.exports = postRouter;
