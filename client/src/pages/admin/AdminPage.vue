<script setup>
import { computed } from "vue";
import { get } from "lodash";
import { useSummary } from "./composables/useSummary";
import { ICON_TYPE } from "./components/CardStats.vue";
import CardStats from "./components/CardStats.vue";
import TrackStatsChart from "./components/TrackStatsChart.vue";
import TrackSummaryChart from "./components/TrackSummaryChart.vue";

const { data: summary, loading: summaryLoading } = useSummary();

const stats = computed(() => {
  const res = summary.value;

  if (!res?.success || !res?.data)
    return {
      totalContact: 0,
      totalCategory: 0,
      totalFood: 0,
    };

  return {
    totalContact: res?.data?.totalContact,
    totalCategory: res?.data?.totalCategory,
    totalFood: res?.data?.totalProduct,
  };
});
</script>

<template>
  <main class="dashboard__wrapper">
    <v-row>
      <v-col cols="12" md="4">
        <CardStats
          title="Total Contact"
          :icon="ICON_TYPE.CONTACT"
          :loading="summaryLoading"
          :value="get(stats, 'totalContact', 0)"
        />
      </v-col>
      <v-col cols="12" md="4">
        <CardStats
          title="Total Category"
          :icon="ICON_TYPE.CATEGORY"
          :loading="summaryLoading"
          :value="get(stats, 'totalCategory', 0)"
        />
      </v-col>
      <v-col cols="12" md="4">
        <CardStats
          title="Total Food"
          :icon="ICON_TYPE.FOOD"
          :loading="summaryLoading"
          :value="get(stats, 'totalFood', 0)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6">
        <TrackStatsChart />
      </v-col>
      <v-col cols="12" lg="6">
        <TrackSummaryChart />
      </v-col>
    </v-row>
  </main>
</template>

<style scoped>
.dashboard__wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
