const User = require("../models/User.js");
const Notification = require("../models/Notification.js")
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/generateToken.js");
const cloudinary = require('../utils/cloudinary');



exports.followUnfollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString()) {
			return res.status(400).json({ error: "You can't follow/unfollow yourself" });
		}

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow the user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow the user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			// Send notification to the user
			const newNotification = new Notification({
				type: "follow",
				from: req.user._id,
				to: userToModify._id,
			});

			await newNotification.save();

			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (error) {
		console.log("Error in followUnfollowUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { fullName, username, email, bio, profileImg, coverImg } = req.body;

        if (fullName) user.fullName = fullName;
        if (username) user.username = username;
        if (email) user.email = email;
        if (bio) user.bio = bio;
        if (profileImg) user.profileImg = profileImg;
        if (coverImg) user.coverImg = coverImg;

        await user.save();

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            bio: user.bio,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getSuggestedUsers = async (req, res) => {
	try {
		const userId = req.user._id;

		const usersFollowedByMe = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{
				$match: {
					_id: { $ne: userId },
				},
			},
			{ $sample: { size: 10 } },
		]);

		// 1,2,3,4,5,6,
		const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id));
		const suggestedUsers = filteredUsers.slice(0, 3);

		suggestedUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestedUsers);
	} catch (error) {
		console.log("Error in getSuggestedUsers: ", error.message);
		res.status(500).json({ error: error.message });
	}
};


exports.getMultipleUserProfiles = async (req, res) => {
	console.log("get profiles")
	try {
	  const { userIds } = req.body; // Expect an array of user IDs in the request body
  
	  // Find all users whose IDs are in the provided array, excluding passwords
	  const users = await User.find({ _id: { $in: userIds } }).select("-password");
  
	  if (!users || users.length === 0) {
		return res.status(404).json({ error: "Users not found" });
	  }
  
	  res.status(200).json(users);
	} catch (error) {
	  console.log("Error in getMultipleUserProfiles controller", error.message);
	  res.status(500).json({ error: "Internal Server Error" });
	}
};

exports.searchUsers = async (req, res) => {
    try {
        const { query } = req.query; // Get search query from query params

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        // Search users by username (case-insensitive)
        const users = await User.find({
            username: { $regex: query, $options: 'i' }
        }).select('-password'); // Exclude password field from results

        res.status(200).json(users);
    } catch (error) {
        console.log("Error in searchUsers controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
