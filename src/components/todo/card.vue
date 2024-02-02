<template>
  <div ref="cardRef" relative h-16 w-80 flex cursor-pointer items-center border bg-white px-2 py-3>
    <button h-5 w-5 border rounded-full p-1>
      <div h-full w-full rounded-full bg-green></div>
    </button>
    <div ml-2>
      <span v-if="!isEdit">{{ props.detail }}</span>
      <input ref="inputRef" :value="props.detail" v-else />
    </div>
    <div h-full flex="~ col" justify-between class="!ml-auto" text-3>
      <span>2023-12-8</span>
      <span>优先级：</span>
    </div>
    <div
      :translate-x="extand ? 0 : 100"
      from="stone-100 10%"
      absolute
      right-0
      top-0
      h-full
      w-full
      flex
      transform
      items-center
      justify-end
      bg-gradient-to-l
      px-2
      space-x-4
    >
      <span i-ri-pencil-line @click="edit"></span>
      <span i-ri-close-circle-line @click="deleteMethod"></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useMouseInElement, useFocus, onKeyStroke } from '@vueuse/core';
const props = defineProps<{
  id: number;
  type: string;
  time: Date;
  detail: string;
  icon: string;
}>();
const emit = defineEmits<{
  edit: [id: number];
  delete: [id: number];
}>();
const isEdit = ref(false);
const edit = async () => {
  isEdit.value = true;
  await nextTick();
  focused.value = true;
};
const deleteMethod = () => {
  emit('delete', props.id);
};
const cardRef = ref<HTMLDivElement | null>(null);
const { isOutside } = useMouseInElement(cardRef);
const extand = computed(() => !isOutside.value && !isEdit.value);
const inputRef = ref<HTMLInputElement | null>(null);
const { focused } = useFocus(inputRef);
onKeyStroke(
  'Enter',
  () => {
    if (focused.value) {
      focused.value = false;
    }
  },
  {
    dedupe: true,
    target: inputRef,
  },
);
watch(focused, () => {
  if (!focused.value && isEdit.value) {
    isEdit.value = false;
    emit('edit', props.id);
  }
});
</script>
<style scoped></style>
