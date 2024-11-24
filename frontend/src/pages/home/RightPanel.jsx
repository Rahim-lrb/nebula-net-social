import React from 'react';
import FollowersCard from "./FollowersCard";
import SuggestedUserCard from './SuggestedUserCard';

export default function RightPanel() {
  return (
    <div className="w-full flex flex-col space-y-4 items-center">
      <FollowersCard />
      <SuggestedUserCard />
    </div>
  );
}
