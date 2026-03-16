import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { createFood } from "../api/food.api";

export const useCreateFoodMutation = () => {
  const mutation = useMutation({
    mutationFn: (payload) => createFood(payload),
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
