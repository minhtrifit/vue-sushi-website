import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getCategories } from "../api/category.api";

export const useCategoryList = (params = {}, options = {}) => {
  const query = useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
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
