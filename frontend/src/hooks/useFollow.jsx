import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useFollow = () => {
  const [pendingUserId, setPendingUserId] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: followMutation, isLoading: isPending } = useMutation({
    mutationFn: async (userId) => {
      setPendingUserId(userId);
      const res = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Follow failed");
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setPendingUserId(null);
    },
  });

  const follow = (userId) => {
    followMutation(userId);
  };

  return {
    follow,
    isPending,
    pendingUserId,
  };
};

export default useFollow;
