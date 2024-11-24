import { useState } from "react";
import Posts from "../../components/posts/Posts";
import CreatePost from "./CreatePost";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

const Home = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <div className="flex min-h-screen pt-20">
      <div className="hidden lg:flex lg:w-1/4 pl-4 pt-20 fixed top-0 bottom-0 left-0 bg-transparent">
        <LeftPanel/>
      </div>

      <div className="flex-1 lg:ml-[25%] lg:mr-[25%] px-4 overflow-auto">
        {/* Header */}
        <div className="flex w-full justify-around border-b border-gray-700 mb-4">
          <div
            className={`flex justify-center flex-1 p-3 cursor-pointer transition duration-300 ${
              feedType === "forYou" ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
            onClick={() => setFeedType("forYou")}
          >
            For You
          </div>
          <div
            className={`flex justify-center flex-1 p-3 cursor-pointer transition duration-300 ${
              feedType === "following" ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
            onClick={() => setFeedType("following")}
          >
            Following
          </div>
        </div>

        <CreatePost/>
        <Posts feedType={feedType} />
      </div>

      <div className="hidden lg:flex lg:w-1/4 pr-4 pt-20 fixed top-0 bottom-0 right-0 bg-transparent">
        <RightPanel/>
      </div>
    </div>
  );
};

export default Home;
