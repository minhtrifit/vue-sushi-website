import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getShowcaseFoods } from "../pages/admin/api/food.api";

export const useShowcaseFood = (options = {}) => {
  const categoryId = ref(null);

  const query = useQuery({
    queryKey: ["foods-showcase", categoryId],
    queryFn: () => getShowcaseFoods(categoryId.value),
    enabled: false,
    retry: false,
    ...options,
  });

  const fetch = async (id) => {
    categoryId.value = id;
    return query.refetch();
  };

  return {
    data: query.data,
    loading: computed(() => query.isLoading.value || query.isFetching.value),
    error: query.error,
    fetch,
  };
};
