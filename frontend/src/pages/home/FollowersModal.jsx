import React from "react";
import { Link } from "react-router-dom"; // Import Link

const FollowersModal = ({ onClose, followers }) => {
  return (
    <div
      className="fixed inset-0 bg-[#232635] bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose} // Close modal when clicking outside of content
    >
      <div
        className="bg-gray-800 p-6 rounded-lg text-white w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-2xl font-semibold">All Followers</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {followers.length === 0 ? (
            <p className="text-gray-400">No followers</p>
          ) : (
            followers.map((follower) => (
              <div
                key={follower._id}
                className="flex items-center space-x-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                <Link to={`/profile/${follower.username}`}>
                  <img
                    src={follower.profileImg || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"}
                    alt={follower.fullName}
                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                  />
                </Link>
                <div>
                  <Link to={`/profile/${follower.username}`}>
                    <p className="text-lg font-semibold">{follower.fullName}</p>
                  </Link>
                  <p className="text-sm text-gray-400">{follower.bio}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
