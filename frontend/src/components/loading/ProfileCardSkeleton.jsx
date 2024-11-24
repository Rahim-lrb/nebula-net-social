import React from "react";

const ProfileCardSkeleton = () => {
  return (
    <div className="relative bg-gray-800 text-white rounded-lg animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="h-32 bg-gray-700"></div>

      {/* Profile Content Skeleton */}
      <div className="p-4 flex flex-col items-center">
        {/* Profile Image Skeleton */}
        <div className="relative -mt-16 mb-4">
          <div className="w-28 h-28 rounded-full bg-gray-600 border-4 border-gray-700"></div>
        </div>

        {/* User Information Skeleton */}
        <div className="w-32 h-6 bg-gray-600 mb-2"></div>
        <div className="w-24 h-4 bg-gray-600 mb-4"></div>

        <div className="flex gap-6 mb-4">
          <div className="text-center">
            <div className="w-8 h-6 bg-gray-600 mx-auto mb-1"></div>
            <div className="w-16 h-4 bg-gray-600 mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="w-8 h-6 bg-gray-600 mx-auto mb-1"></div>
            <div className="w-16 h-4 bg-gray-600 mx-auto"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="w-24 h-8 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
