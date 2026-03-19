<script setup>
import { StatsChartType } from "@/constants/index";

const props = defineProps({
  filter: { type: Object, required: true },
});

const {
  type,
  year,
  quarter,
  month,
  yearOptions,
  quarterOptions,
  monthOptions,
} = props.filter;
</script>

<template>
  <div class="d-flex ga-3">
    <v-select
      v-model="type"
      :items="[
        { title: 'Year', value: StatsChartType.YEAR },
        { title: 'Quarter', value: StatsChartType.QUARTER },
        { title: 'Month', value: StatsChartType.MONTH },
      ]"
      label="Type"
      style="max-width: 120px"
    />

    <v-select
      v-model="year"
      :items="yearOptions"
      label="Year"
      style="max-width: 120px"
    />

    <v-select
      v-if="type === StatsChartType.QUARTER"
      v-model="quarter"
      :items="quarterOptions"
      label="Quarter"
      style="max-width: 120px"
    />

    <v-select
      v-if="type === StatsChartType.MONTH"
      v-model="month"
      :items="monthOptions"
      label="Month"
      style="max-width: 140px"
    />
  </div>
</template>
