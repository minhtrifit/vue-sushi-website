import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getDetailCategory } from "../api/category.api";

export const useCategory = (options = {}) => {
  const categoryId = ref(null);

  const query = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getDetailCategory(categoryId.value),
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
