import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getDetailFood } from "../api/food.api";

export const useFood = (options = {}) => {
  const foodId = ref(null);

  const query = useQuery({
    queryKey: ["food", foodId],
    queryFn: () => getDetailFood(foodId.value),
    enabled: false,
    retry: false,
    ...options,
  });

  const fetch = async (id) => {
    foodId.value = id;
    return query.refetch();
  };

  return {
    data: query.data,
    loading: computed(() => query.isLoading.value || query.isFetching.value),
    error: query.error,
    fetch,
  };
};
