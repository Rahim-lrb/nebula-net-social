import React, { useState } from 'react';
import Posts from '../../components/posts/Posts.jsx';
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditProfileModal from './EditProfileModal';
import useFollow from '../../hooks/useFollow'; 
import toast from "react-hot-toast";
import ProfileHeaderSkeleton from '../../components/loading/ProfileHeaderSkeleton.jsx'; 

export default function Profile() {
  const [feedType, setFeedType] = useState("forYou");
  const { follow, isPending } = useFollow();
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const isMyProfile = authUser?._id === user?._id;
  const isFollowing = user?.followers?.some(followerId => followerId === authUser?._id);

  const handleFollowClick = () => {
    if (!isMyProfile) {
      follow(user?._id);
    }
  };

  if (isLoading) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="relative">
        <img
          src={user?.coverImg ? user?.coverImg : "https://via.placeholder.com/1200x400?text=no+Cover+Image"}
          alt="Cover"
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
          <img
            src={user?.profileImg ? user?.profileImg : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-700"
          />
        </div>
      </div>

      <div className="p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user?.fullName}</h1>
        <p className="text-lg text-gray-400 mb-4">@{user?.username}</p>
        <p className="text-gray-300 mb-1 sm:mb-4 text-sm sm:text-md">
          {user?.bio ? user?.bio : "No bio available"}
        </p>
        <a
          href={user?.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-sm sm:text-md"
        >
          {user?.link ? user?.link : "No link available"}
        </a>
      </div>

      {/* Follow/Unfollow Button */}
      {!isMyProfile && (
        <div className="text-center mb-6">
          <button
            className={`px-4 py-2 rounded-lg transition ${isPending ? "bg-gray-400" : isFollowing ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
            onClick={handleFollowClick}
            disabled={isPending}
          >
            {isPending ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      )}

      {/* Stats Section */}
      <div className="flex flex-row justify-around border-t border-gray-700 py-4">
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-semibold">{user?.followers.length}</p>
          <p className="text-gray-400 text-xs sm:text-md">Followers</p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-semibold">{user?.following.length}</p>
          <p className="text-gray-400 text-xs sm:text-md">Following</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{user?.likedPosts.length}</p>
          <p className="text-gray-400 text-xs sm:text-md">Liked Posts</p>
        </div>
      </div>

      {isMyProfile && (
        <footer className="pt-2 sm:mt-6 text-center">
          <EditProfileModal authUser={authUser} />
        </footer>
      )}

      <div className="mx-2 sm:mx-20 md:mx-30 lg:mx-52">
        <Posts feedType="posts" username={user?.username} />
      </div>
    </div>
  );
}
