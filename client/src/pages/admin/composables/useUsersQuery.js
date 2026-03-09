import { useQuery } from "@tanstack/vue-query";
import { getUsers } from "../api/user.api";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
