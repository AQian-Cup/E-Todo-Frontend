import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  const now = ref(new Date());
  const year = ref(now.value.getFullYear());
  const month = ref(now.value.getMonth() + 1);
  const day = ref(now.value.getDate());
  return { now, year, month, day };
});
