import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";
import Loading from "../../components/loading/Loading";
import SuggestedUserSkeleton from "../../components/loading/SuggestedUserSkeleton";

const SuggestedUserCard = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const res = await fetch(`/api/users/suggested`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong!");
      }
      return data;
    },
  });

  const { follow, isPending, pendingUserId } = useFollow();

  if (suggestedUsers?.length === 0) return <div className="md:w-64 w-0"></div>;

  return (
    <div className="w-full max-w-md my-4 mx-2 lg:block">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
        <h3 className="text-lg font-semibold mb-3">Who to Follow</h3>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <>
              <SuggestedUserSkeleton />
              <SuggestedUserSkeleton />
              <SuggestedUserSkeleton />
              <SuggestedUserSkeleton />
            </>
          ) : (
            suggestedUsers?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-md transition duration-200"
                key={user._id}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
                    <img
                      src={user.profileImg || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"}
                      alt={user.fullName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold truncate w-28">{user.fullName}</span>
                    <span className="text-xs text-gray-400">@{user.username}</span>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white rounded-full px-4 py-1 text-sm hover:bg-blue-600 transition duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      follow(user._id);
                    }}
                    disabled={pendingUserId === user._id}
                  >
                    {pendingUserId === user._id ? <Loading size="sm" /> : "Follow"}
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestedUserCard;
