<script setup>
import { computed } from "vue";
import VChart from "vue-echarts";
import { StatsChartType } from "@/constants/index";
import { useStatsFilter } from "../composables/useStatsFilter";
import { useTrackStats } from "../composables/useTrackStats";
import StatsFilter from "./StatsFilter.vue";

const filter = useStatsFilter();
const { data, loading } = useTrackStats(filter.params);

const CHART_LABEL = computed(() => {
  if (
    filter.type.value === StatsChartType.YEAR ||
    filter.type.value === StatsChartType.QUARTER
  )
    return "Month";
  if (filter.type.value === StatsChartType.MONTH) return "Day";

  return "Time";
});

const CHART_OPTION = computed(() => {
  const res = data.value;

  if (!res?.success || !res?.data) {
    return {};
  }

  return {
    grid: {
      top: 60,
      left: 60,
      right: 20,
      bottom: 60,
    },

    tooltip: {
      trigger: "axis",
    },

    xAxis: {
      type: "category",
      data: res?.data?.map((item) => item.label),
      name: CHART_LABEL.value,
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },

    yAxis: {
      type: "value",
      name: "Views",
      nameLocation: "middle",
      nameGap: 50,
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },

    series: [
      {
        name: "Views",
        type: "bar",
        data: res?.data?.map((item) => item.value),
        itemStyle: {
          color: "hsl(358, 54%, 48%)",
        },
      },
    ],
  };
});
</script>

<template>
  <v-card style="min-height: 100%" class="pa-4">
    <StatsFilter :filter="filter" />
    <h3 style="margin: 0; text-align: center">Website View Stats</h3>
    <div>
      <v-skeleton-loader
        class="custom-skeleton"
        v-if="loading"
        type="image"
        height="200"
      />

      <v-chart
        v-else
        :option="CHART_OPTION"
        autoresize
        style="height: 400px; margin: 0"
      />
    </div>
  </v-card>
</template>

<style scoped>
.custom-skeleton {
  background-color: transparent !important;
}
</style>
