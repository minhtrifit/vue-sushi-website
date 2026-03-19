import { ref, computed, watch } from "vue";
import { StatsChartType } from "@/constants/index";

export const useStatsFilter = () => {
  const now = new Date();

  const type = ref(StatsChartType.YEAR);
  const year = ref(now.getFullYear());
  const quarter = ref(null);
  const month = ref(null);

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = now.getFullYear() - i;
    return { title: `${y}`, value: y };
  });

  const quarterOptions = [
    { title: "Q1", value: 1 },
    { title: "Q2", value: 2 },
    { title: "Q3", value: 3 },
    { title: "Q4", value: 4 },
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    title: `Month ${i + 1}`,
    value: i + 1,
  }));

  // reset khi đổi type
  watch(type, () => {
    if (type.value === StatsChartType.YEAR) {
      quarter.value = null;
      month.value = null;
    } else if (type.value === StatsChartType.MONTH) {
      quarter.value = null;
      month.value = 1;
    } else if (type.value === StatsChartType.QUARTER) {
      quarter.value = 1;
      month.value = null;
    }
  });

  const params = computed(() => {
    const p = {
      type: type.value,
      year: year.value,
    };

    if (type.value === StatsChartType.QUARTER) p.quarter = quarter.value;
    if (type.value === StatsChartType.MONTH) p.month = month.value;

    return p;
  });

  return {
    type,
    year,
    quarter,
    month,
    yearOptions,
    quarterOptions,
    monthOptions,
    params,
  };
};
