import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getTrackStats } from "../api/stats.api";

export const useTrackStats = (params, options = {}) => {
  const query = useQuery({
    queryKey: computed(() => ["track_stats", params.value]),
    queryFn: () => getTrackStats(params.value),
    enabled: computed(() => !!params.value.year), // tránh call sớm
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
