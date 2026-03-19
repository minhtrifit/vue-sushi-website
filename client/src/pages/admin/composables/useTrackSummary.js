import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getTrackSummary } from "../api/stats.api";

export const useTrackSummary = (options = {}) => {
  const query = useQuery({
    queryKey: computed(() => ["track_summary"]),
    queryFn: () => getTrackSummary(),
    enabled: true,
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
