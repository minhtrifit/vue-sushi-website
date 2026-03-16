import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getFoods } from "../api/food.api";

export const useFoodList = (params = {}, options = {}) => {
  const query = useQuery({
    queryKey: ["foods", params],
    queryFn: () => getFoods(params),
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
