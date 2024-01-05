<template>
  <div fixed left-8 top-4 flex items-center justify-center text-4 space-x-1>
    <span>{{ route.name }}</span>
    <div v-if="isIconShow" i-ri-arrow-drop-left-line cursor-pointer text-8 @click="goBack"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isIconShow = computed(() => {
  if (route.name === '首页') {
    return false;
  }
  return true;
});
const goBack = () => {
  router.back();
};
</script>
<style scoped></style>
