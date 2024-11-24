import React from "react";

// Skeleton Loader for Followers Card
const FollowersCardSkeleton = () => {
  return (
    <div className="w-full max-w-md p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Followers</h3>
      <div className="space-y-4">
        {Array(1)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-700 rounded-md animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-600" />
                <div className="w-32 h-4 bg-gray-600 rounded-md" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FollowersCardSkeleton;
