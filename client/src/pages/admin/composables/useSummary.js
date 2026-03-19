import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getSummary } from "../api/stats.api";

export const useSummary = (params = {}, options = {}) => {
  const query = useQuery({
    queryKey: ["stats_summary", params],
    queryFn: () => getSummary(params),
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
