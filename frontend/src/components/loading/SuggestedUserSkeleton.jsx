const SuggestedUserSkeleton = () => {
    return (
      <div className="flex items-center justify-between p-2 bg-gray-700 rounded-md animate-pulse">
        <div className="flex items-center gap-3">
          {/* Profile image skeleton */}
          <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
          
          {/* Name and username skeleton */}
          <div className="flex flex-col">
            <div className="w-28 h-4 bg-gray-600 rounded mb-2"></div>
            <div className="w-16 h-3 bg-gray-600 rounded"></div>
          </div>
        </div>
        
        {/* Follow button skeleton */}
        <div className="w-20 h-8 bg-gray-600 rounded-full"></div>
      </div>
    );
  };
  
  export default SuggestedUserSkeleton;
  