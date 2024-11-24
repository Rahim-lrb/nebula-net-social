const Notification = require("../models/Notification.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");
const cloudinary = require('../utils/cloudinary');

exports.createPost = async (req, res) => {
    console.log("Creating")
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!text && !img) {
            return res.status(400).json({ error: "Post must have text or image" });
        }

        if (img) {
            console.log("we try to upload the image")
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
            console.log("done")
        }

        const newPost = new Post({
            user: userId,
            text,
            img,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error in createPost controller: ", error);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this post" });
        }

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deletePost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = { user: userId, text };

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentOnPost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // Unlike post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
            res.status(200).json(updatedLikes);
        } else {
            // Like post
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });
            await notification.save();

            const updatedLikes = post.likes;
            res.status(200).json(updatedLikes);
        }
    } catch (error) {
        console.log("Error in likeUnlikePost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        if (posts.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getLikedPosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        res.status(200).json(likedPosts);
    } catch (error) {
        console.log("Error in getLikedPosts controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const following = user.following;

        const feedPosts = await Post.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        res.status(200).json(feedPosts);
    } catch (error) {
        console.log("Error in getFollowingPosts controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" });

        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getUserPosts controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



// exports.getAllPosts = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1; // Default to page 1
//         const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page
//         const skip = (page - 1) * limit;

//         const posts = await Post.find()
//             .sort({ createdAt: -1 }) // Sort by newest first
//             .skip(skip)
//             .limit(limit)
//             .populate({
//                 path: "user",
//                 select: "-password",
//             })
//             .populate({
//                 path: "comments.user",
//                 select: "-password",
//             });

//         const totalPosts = await Post.countDocuments(); // Total post count

//         res.status(200).json({
//             posts,
//             totalPosts,
//             currentPage: page,
//             totalPages: Math.ceil(totalPosts / limit),
//         });
//     } catch (error) {
//         console.error("Error in getAllPosts:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// // Get liked posts with pagination
// exports.getLikedPosts = async (req, res) => {
//     const userId = req.params.id;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     try {
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ error: "User not found" });

//         const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
//             .skip(skip)
//             .limit(limit)
//             .populate({
//                 path: "user",
//                 select: "-password",
//             })
//             .populate({
//                 path: "comments.user",
//                 select: "-password",
//             });

//         const totalLikedPosts = user.likedPosts.length;

//         res.status(200).json({
//             likedPosts,
//             totalLikedPosts,
//             currentPage: page,
//             totalPages: Math.ceil(totalLikedPosts / limit),
//         });
//     } catch (error) {
//         console.error("Error in getLikedPosts:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// // Get posts from users followed by the logged-in user with pagination
// exports.getFollowingPosts = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     try {
//         const userId = req.user._id;
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ error: "User not found" });

//         const following = user.following;

//         const feedPosts = await Post.find({ user: { $in: following } })
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit)
//             .populate({
//                 path: "user",
//                 select: "-password",
//             })
//             .populate({
//                 path: "comments.user",
//                 select: "-password",
//             });

//         const totalFollowingPosts = await Post.countDocuments({ user: { $in: following } });

//         res.status(200).json({
//             feedPosts,
//             totalFollowingPosts,
//             currentPage: page,
//             totalPages: Math.ceil(totalFollowingPosts / limit),
//         });
//     } catch (error) {
//         console.error("Error in getFollowingPosts:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// // Get a specific user's posts with pagination
// exports.getUserPosts = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     try {
//         const { username } = req.params;

//         const user = await User.findOne({ username });
//         if (!user) return res.status(404).json({ error: "User not found" });

//         const posts = await Post.find({ user: user._id })
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit)
//             .populate({
//                 path: "user",
//                 select: "-password",
//             })
//             .populate({
//                 path: "comments.user",
//                 select: "-password",
//             });

//         const totalUserPosts = await Post.countDocuments({ user: user._id });

//         res.status(200).json({
//             posts,
//             totalUserPosts,
//             currentPage: page,
//             totalPages: Math.ceil(totalUserPosts / limit),
//         });
//     } catch (error) {
//         console.error("Error in getUserPosts:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };