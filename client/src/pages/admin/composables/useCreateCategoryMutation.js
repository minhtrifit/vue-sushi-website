import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { createCategory } from "../api/category.api";

export const useCreateCategoryMutation = () => {
  const mutation = useMutation({
    mutationFn: (payload) => createCategory(payload),
  });

  const loading = computed(() => mutation.isPending.value);
  const error = computed(() => mutation.error.value);
  const data = computed(() => mutation.data.value);

  return {
    create: mutation.mutate,
    createAsync: mutation.mutateAsync,
    loading,
    error,
    data,
  };
};
