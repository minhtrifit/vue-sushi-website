import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { login } from "../api/auth.api";

export const useLodingMutation = () => {
  const mutation = useMutation({
    mutationFn: login,
  });

  const loading = computed(() => mutation.isPending.value);
  const error = computed(() => mutation.error.value);
  const data = computed(() => mutation.data.value);

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    loading,
    error,
    data,
  };
};
