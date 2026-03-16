import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { updateFood } from "../api/food.api";

export const useUpdateFoodMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }) => updateFood(id, payload),
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
