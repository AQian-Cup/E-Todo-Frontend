<template>
  <div flex="~ col" gap-2>
    <div flex self-end text-6>
      <span>当前是：</span>
      <span>{{ calendarStore.year + '年' }}</span>
      <span>{{ calendarStore.month + '月' }}</span>
    </div>
    <div flex items-center self-end justify-center text-5>
      <div i-ri-arrow-left-double-line cursor-pointer @click="goYear(-1)"></div>
      <div i-ri-arrow-left-s-line cursor-pointer @click="goMonth(-1)"></div>
      <div i-ri-arrow-right-s-line cursor-pointer @click="goMonth(1)"></div>
      <div i-ri-arrow-right-double-line cursor-pointer @click="goYear(1)"></div>
    </div>
    <div grid="~ rows-1 cols-7" h-12 w-144 gap-0.25>
      <span v-for="day of week" flex items-center justify-center>{{ day }}</span>
    </div>
    <div
      grid="~ auto-rows-[minmax(5rem,_1fr)] cols-7"
      w-144
      gap-0.25
      bg-slate-200
      border="1 slate-200"
    >
      <div
        v-for="(number, index) of dayNumber"
        cursor-pointer
        p-2
        transition
        :class="[getNumberClass(number, index), getSelectClass(number, index)]"
        @click="selectDate(number, index)"
      >
        {{ number }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCalendarStore } from '@/stores/calendar';
import { computed, watch } from 'vue';

const calendarStore = useCalendarStore();
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const dayNumber = computed(() => {
  const number = new Date(calendarStore.year, calendarStore.month, 0).getDate();
  const dayNumberList = [...Array(number).keys()].map((i) => i + 1);
  const dayofweek = new Date(
    calendarStore.year,
    calendarStore.month - 1,
    dayNumberList[0],
  ).getDay();
  const lastNumber = new Date(calendarStore.year, calendarStore.month - 1, 0).getDate();
  const lastNumberList = [...Array(lastNumber).keys()].map((i) => i + 1);
  const result = [...dayNumberList];
  if (dayofweek) {
    result.unshift(...lastNumberList.slice(-1 * dayofweek));
  }
  console.log(result);
  if (result.length <= 35) {
    result.push(...dayNumberList.slice(0, 35 - result.length));
  } else {
    result.push(...dayNumberList.slice(0, 42 - result.length));
  }
  return result;
});
const getNumberClass = (number: number, index: number) => {
  if (Math.abs((number - index) / 7) <= 1) {
    return 'opacity-100 hover:bg-stone-100';
  } else {
    return 'opacity-50';
  }
};
const getSelectClass = (number: number, index: number) => {
  if (number === calendarStore.day && Math.abs((number - index) / 7) <= 1) {
    return 'bg-stone-100 text-blue';
  } else {
    return 'bg-stone-50 text-black';
  }
};
const selectDate = (number: number, index: number) => {
  if (Math.abs((number - index) / 7) <= 1) {
    calendarStore.day = number;
  }
};
const goYear = (number: number) => {
  const result = calendarStore.year + number;
  if (result < calendarStore.now.getFullYear()) {
    return false;
  }
  calendarStore.year = result;
  return true;
};
const goMonth = (number: number) => {
  let result = calendarStore.month + number;
  if (result < 1) {
    result = 12;
    if (!goYear(-1)) {
      return false;
    }
  }
  if (result > 12) {
    result = 1;
    goYear(1);
  }
  calendarStore.month = result;
  return true;
};
watch(
  () => calendarStore.month,
  (newValue) => {
    if (newValue === 13) {
      calendarStore.year++;
      calendarStore.month = 1;
    }
    if (newValue === 0) {
      calendarStore.year--;
      calendarStore.month = 12;
    }
  },
);
</script>
<style scoped></style>
