import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import FollowersModal from "./FollowersModal";
import { useQuery } from "@tanstack/react-query";
import FollowersCardSkeleton from "../../components/loading/FollowersCardSkeleton"; // Import the skeleton component

const fetchFollowersProfiles = async (followerIds) => {
  const response = await fetch("/api/users/profiles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userIds: followerIds, // Pass the array of follower IDs
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch follower profiles");
  }

  return response.json(); // Return the array of users
};

const FollowersCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const followers = authUser?.followers || [];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch followers' profiles using react-query
  const { data: followerProfiles = [], isLoading, isError } = useQuery({
    queryKey: ["followersProfiles", followers],
    queryFn: () => fetchFollowersProfiles(followers), // Call the fetch function
    enabled: followers.length > 0, // Only fetch if there are followers
  });

  if (isLoading) return <FollowersCardSkeleton />; // Render the skeleton loader while loading
  if (isError) return <div>Error fetching followers</div>;

  // Show only first 2 profiles in card
  const visibleFollowers = followerProfiles.slice(0, 2);

  return (
    <div className="w-full max-w-md p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Followers</h3>
      <div className="space-y-4">
        {followers.length === 0 ? (
          <p className="text-gray-400">No followers</p>
        ) : (
          visibleFollowers.map((follower) => (
            <div
              key={follower._id} // Use fetched user data
              className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-md transition duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
                  <Link to={`/profile/${follower.username}`}>
                    <img
                      src={
                        follower.profileImg ||
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"
                      }
                      alt={follower.fullName}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                </div>
                <Link to={`/profile/${follower.username}`}>
                  <p className="text-sm font-medium">{follower.fullName}</p>
                </Link>
              </div>
            </div>
          ))
        )}
        {followers.length > 2 && (
          <button
            onClick={openModal}
            className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 text-sm"
          >
            Show All Followers
          </button>
        )}
      </div>

      {/* Render the FollowersModal if isModalOpen is true */}
      {isModalOpen && <FollowersModal onClose={closeModal} followers={followerProfiles} />}
    </div>
  );
};

export default FollowersCard;
