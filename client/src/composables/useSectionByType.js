import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getSectionByType } from "../pages/admin/api/section.api";

export const useSectionByType = (type, options = {}) => {
  const query = useQuery({
    queryKey: ["section", type],
    queryFn: () => getSectionByType(type),
    enabled: !!type,
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
