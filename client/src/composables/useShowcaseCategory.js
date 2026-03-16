import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getShowcaseCategories } from "../pages/admin/api/category.api";

export const useShowcaseCategory = (params = {}, options = {}) => {
  const query = useQuery({
    queryKey: ["categories-showcase", params],
    queryFn: () => getShowcaseCategories(params),
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
