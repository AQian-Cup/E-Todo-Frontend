import { ref } from 'vue';
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

export const useCalendarStore = defineStore('calendar', () => {
  const now = ref(DateTime.now());
  const year = ref(now.value.year);
  const month = ref(now.value.month);
  const day = ref(now.value.day);
  return { now, year, month, day };
});
