import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
  }),
  actions: {
    setUser(payload) {
      this.user = payload;
    },
    setLoading(value) {
      this.loading = value;
    },
  },
});
