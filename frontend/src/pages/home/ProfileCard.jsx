import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../../components/loading/FollowersCardSkeleton"; // Import skeleton

const ProfileCard = () => {
  const { data: authUser, isLoading, isError } = useQuery({ queryKey: ["authUser"] });

  if (isLoading) return <ProfileCardSkeleton />; // Render skeleton while loading
  if (isError) return <div>Error loading profile</div>;

  return (
    <div className="relative bg-gray-800 text-white rounded-lg">
      {/* Cover Image */}
      <div className="h-32 bg-gray-700 w-full">
        <img
          src={authUser.coverImg ? authUser.coverImg : "https://via.placeholder.com/600x200?text=Cover+Image"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Content */}
      <div className="p-4 flex flex-col items-center">
        {/* Profile Image */}
        <div className="relative -mt-16 mb-4">
          <img
            src={authUser.profileImg ? authUser.profileImg : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-700"
          />
        </div>

        {/* User Information */}
        <h2 className="text-2xl font-semibold">{authUser.fullName}</h2>
        <p className="text-gray-400 mt-1 mb-4 text-center">
          {authUser.bio ? authUser.bio : "No bio available"}
        </p>
        <div className="flex gap-6 mb-4">
          <div className="text-center">
            <p className="text-lg font-semibold">{authUser.followers.length}</p>
            <p className="text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{authUser.following.length}</p>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        <Link
          to={`/profile/${authUser.username}`}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
