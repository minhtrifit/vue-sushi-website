import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { updateCategory } from "../api/category.api";

export const useUpdateCategoryMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),
  });

  const loading = computed(() => mutation.isPending.value);
  const error = computed(() => mutation.error.value);
  const data = computed(() => mutation.data.value);

  return {
    update: mutation.mutate,
    updateAsync: mutation.mutateAsync,
    loading,
    error,
    data,
  };
};
