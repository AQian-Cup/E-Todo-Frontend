<template>
  <div flex="~ col" overflow-hidden rounded>
    <slot></slot>
    <div mt-auto flex="~ col" items-end p-2>
      <Transition name="createCard" mode="out-in">
        <button
          v-if="!isCreate"
          h-8
          w-8
          flex
          items-center
          justify-center
          rounded-full
          bg-stone-200
          p-2
          shadow
          @click="isCreate = !isCreate"
        >
          <span i-ri-play-list-add-fill h-full w-full></span>
        </button>
        <form
          v-else
          flex="~ col"
          gap-2
          h-56
          w-full
          rounded-t-4
          from-white
          to-stone-50
          p-2
          mt-2
          bg-gradient-to-b
          relative
          class="beforeAddCard"
        >
          <fieldset z-1 flex>
            <Label shrink-0>时间：</Label>
            <VueDatePicker
              v-model="form.date"
              input-class-name="dp-custom-input"
              locale="zh-CN"
              year-first
              time-picker-inline
              select-text="选择"
              cancel-text="取消"
              hide-input-icon
              placeholder="选择事项日期"
              week-start="0"
              :clearable="false"
              format="yyyy/MM/dd HH:mm"
              @open="openDatePicker"
            ></VueDatePicker>
          </fieldset>
          <fieldset z-1 flex>
            <Label shrink-0>标题：</Label>
            <input
              v-model="form.title"
              border
              rounded
              w-full
              px-1
              text-14px
              placeholder="输入事项标题"
            />
          </fieldset>
          <fieldset z-1 flex items-start>
            <Label shrink-0>描述：</Label>
            <textarea
              v-model="form.description"
              focus:outline-none
              focus-visible:outline-none
              border
              rounded
              w-full
              px-1
              resize-none
              text-14px
              placeholder="输入事项描述"
            />
          </fieldset>
          <fieldset z-1 flex>
            <Label shrink-0>类型：</Label>
            <n-select
              v-model:value="form.type"
              :options="typeOptions"
              size="small"
              placeholder="选择事项类型"
            ></n-select>
          </fieldset>
          <fieldset z-1 flex>
            <Label>级别：</Label>
            <n-rate v-model:value="form.level" ml-auto></n-rate>
          </fieldset>
          <div flex z-1 gap-2>
            <button type="button" flex-1 bg-stone-200 @click="cancel">取消</button>
            <button type="button" flex-1 bg-green text-white @click="create">创建</button>
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCalendarStore } from '@/stores/calendar';
import ky from '@/fetch';
import { DateTime } from 'luxon';

interface Form {
  title: string;
  description: string;
  type: string | null;
  level: number | null;
  date: Date | null;
}

const calendarStore = useCalendarStore();
const isCreate = ref(false);
const form = ref<Form>({
  title: '',
  description: '',
  type: null,
  level: null,
  date: null,
});
const typeOptions = ref([
  {
    label: '生活',
    value: '生活',
  },
  {
    label: '工作',
    value: '工作',
  },
  {
    label: '娱乐',
    value: '娱乐',
  },
  {
    label: '其他',
    value: '其他',
  },
]);
const openDatePicker = () => {
  const now = DateTime.now();
  form.value.date = DateTime.local(
    calendarStore.year,
    calendarStore.month,
    calendarStore.day,
    now.hour,
    now.minute,
  ).toJSDate();
};
const cancel = () => {
  form.value = {
    title: '',
    description: '',
    type: null,
    level: null,
    date: null,
  };
  isCreate.value = false;
};
const create = async () => {
  const body = {
    ...form.value,
    date: undefined,
    timestamp: DateTime.fromJSDate(form.value.date as Date).toUnixInteger(),
  };
  await ky
    .post('tasks/', {
      json: body,
    })
    .catch((err) => {
      console.error(err);
    });
  cancel();
};
</script>
<style scoped>
@keyframes createCard-in {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.createCard-enter-active {
  animation: createCard-in 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.createCard-leave-active {
  animation: createCard-in 1s cubic-bezier(0.215, 0.61, 0.355, 1) reverse both;
}
.beforeAddCard {
  /* 忽略prettier，避免将['']修改成[' '] */
  /* prettier-ignore */
  --uno: 'before:content-[''] before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-transparent before:shadow-[0_-4px_12px_-8px_rgba(0,0,0,0.2)]';
}
:deep(.n-base-selection) {
  --n-padding-single: 0.25rem;
}
</style>
<style>
.dp__action_buttons {
  flex: initial;
}
.dp-custom-input {
  padding: 0 0.25rem;
  font-size: 14px;
}
/* --n-option-padding属于组件库动态添加，无法在style中定义，故直接修改样式 */
/* 不知为何无法在:deep()中正常修改，故于style中进行修改 */
.n-base-select-menu .n-base-select-option {
  padding: 0.5rem;
}
</style>
