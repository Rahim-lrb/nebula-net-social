import React from 'react';

const ProfileHeaderSkeleton = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="relative">
        <div className="w-full h-72 bg-gray-800 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
          <div className="w-28 h-28 bg-gray-700 rounded-full animate-pulse border-4 border-gray-600" />
        </div>
      </div>

      <div className="p-6 text-center">
        <div className="h-6 bg-gray-700 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-600 mb-4 animate-pulse w-1/2 mx-auto" />
        <div className="h-4 bg-gray-600 mb-4 w-3/4 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-600 w-1/3 mx-auto animate-pulse" />
      </div>

      <div className="flex flex-col md:flex-row justify-around border-t border-gray-700 py-4">
        <div className="text-center mb-4 md:mb-0">
          <div className="h-6 bg-gray-700 mb-1 animate-pulse" />
          <div className="h-4 bg-gray-600 animate-pulse" />
        </div>
        <div className="text-center mb-4 md:mb-0">
          <div className="h-6 bg-gray-700 mb-1 animate-pulse" />
          <div className="h-4 bg-gray-600 animate-pulse" />
        </div>
        <div className="text-center">
          <div className="h-6 bg-gray-700 mb-1 animate-pulse" />
          <div className="h-4 bg-gray-600 animate-pulse" />
        </div>
      </div>

      <div className="mx-10 py-10">
        {/* Placeholder for posts skeleton */}
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
