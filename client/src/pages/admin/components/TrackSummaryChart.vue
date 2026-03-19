<script setup>
import { computed } from "vue";
import VChart from "vue-echarts";
import { useTrackSummary } from "../composables/useTrackSummary";

const { data, loading } = useTrackSummary();

const CHART_OPTION = computed(() => {
  const res = data.value;

  if (!res?.success || !res?.data) {
    return {
      series: [],
    };
  }

  const formattedData = res?.data?.map((d) => {
    return {
      name: d?.path,
      value: d?._count?.path,
    };
  });

  return {
    tooltip: {
      trigger: "item",
    },

    legend: {
      orient: "horizontal",
      bottom: "bottom",
    },

    series: [
      {
        name: "Page Views",
        type: "pie",
        radius: "60%",
        data: formattedData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<template>
  <v-card style="min-height: 100%" class="pa-4">
    <h3 style="margin: 0; text-align: center">Website Page Summary</h3>

    <v-skeleton-loader
      class="custom-skeleton"
      v-if="loading"
      type="image"
      height="200"
    />

    <v-chart v-else :option="CHART_OPTION" autoresize style="height: 400px" />
  </v-card>
</template>

<style scoped>
.custom-skeleton {
  background-color: transparent !important;
}
</style>
