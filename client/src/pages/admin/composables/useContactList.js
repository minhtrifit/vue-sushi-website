import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getContacts } from "../api/contact.api";

export const useContactList = (params = {}, options = {}) => {
  const query = useQuery({
    queryKey: ["sections", params],
    queryFn: () => getContacts(params),
    retry: false,
    ...options,
  });

  return {
    data: query.data,
    loading: computed(() => query.isLoading.value || query.isFetching.value),
    error: query.error,
    refetch: query.refetch,
  };
};
