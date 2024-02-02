<template>
  <div fixed w-full>
    <div w-full flex items-center justify-between px-8 py-4 text-4 space-x-1>
      <span>{{ route.name }}</span>
      <div v-if="isIconShow" i-ri-arrow-drop-left-line cursor-pointer text-8 @click="goBack"></div>
      <div ml-auto>
        <AvatarRoot
          h-8
          w-8
          inline-flex
          cursor-pointer
          items-center
          justify-center
          rounded-full
          bg-stone-200
        >
          <AvatarImage h-full w-full rounded-inherit object-cover :src="avatar" alt="avatar" />
          <AvatarFallback :delayMs="500">空</AvatarFallback>
        </AvatarRoot>
      </div>
    </div>
    <Toaster position="bottom-right" />
  </div>
</template>
<script lang="ts" setup>
import ky from '@/fetch';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Toaster, toast } from 'vue-sonner';

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
const avatar = ref();
const getAvatar = async () => {
  try {
    const json = (await ky.get('users/current').json()) as { avatar?: string };
    avatar.value = json?.avatar ?? '';
  } catch (err: any) {
    toast.error(err.message);
  }
};
onMounted(async () => {
  await getAvatar();
});
</script>
<style scoped></style>
