<template>
  <div h-screen w-full flex items-center justify-center>
    <div h-94 w-80 flex justify-center rounded-2 bg-white p-4 shadow border="2 stone-400">
      <TabsRoot flex="~ col" w-full v-model="triggerValue">
        <TabsList relative flex>
          <TabsIndicator
            transition="[width,transform]"
            absolute
            bottom-0
            left="15%"
            h-0.5
            w="[calc(var(--radix-tabs-indicator-size)_-_30%)]"
            translate-x="[--radix-tabs-indicator-position]"
            rounded-full
            duration-300
          >
            <div h-full w-full bg-green-300></div>
          </TabsIndicator>
          <TabsTrigger
            v-for="trigger in triggerList"
            flex="~ 1"
            items-center
            justify-center
            bg-white
            :value="trigger.value"
          >
            {{ trigger.text }}
          </TabsTrigger>
        </TabsList>
        <TabsContent grow flex="~ col" :value="0">
          <div class="form">
            <fieldset>
              <Label>用户名</Label>
              <input v-model="name" />
            </fieldset>
            <fieldset>
              <Label>密码</Label>
              <input v-model="password" type="password" />
            </fieldset>
            <fieldset>
              <Label>确认密码</Label>
              <input v-model="rePassword" type="password" />
            </fieldset>
            <fieldset>
              <Label>邮箱</Label>
              <input v-model="email" />
            </fieldset>
            <fieldset>
              <Label>昵称</Label>
              <input v-model="nickname" />
            </fieldset>
          </div>
          <button class="submitButton" @click="register">注册</button>
        </TabsContent>
        <TabsContent grow flex="~ col" :value="1">
          <div class="form">
            <fieldset>
              <Label>用户名</Label>
              <input v-model="name" />
            </fieldset>
            <fieldset>
              <Label>密码</Label>
              <input v-model="password" type="password" />
            </fieldset>
          </div>
          <button class="submitButton" @click="login">登录</button>
        </TabsContent>
      </TabsRoot>
    </div>
    <Toaster position="bottom-right" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ky from '@/fetch/index';
import { Toaster, toast } from 'vue-sonner';
import { useRouter, useRoute } from 'vue-router';

const triggerList = ref([
  {
    value: 0,
    text: '注册',
  },
  {
    value: 1,
    text: '登录',
  },
]);
const triggerValue = ref(1);
const name = ref('');
const password = ref('');
const rePassword = ref('');
const email = ref('');
const nickname = ref('');
const router = useRouter();
const route = useRoute();
const typeObject: { [key: string]: number } = {
  register: 0,
  login: 1,
};
if (route.query.type) {
  triggerValue.value = typeObject[route.query.type as string];
}
const register = async () => {
  if (password.value !== rePassword.value) {
    toast.error('两次密码不一致');
    return;
  }
  try {
    await ky.post('register', {
      json: {
        name: name.value,
        password: password.value,
        email: email.value,
        nickname: nickname.value,
      },
    });
  } catch (err) {
    toast.error((err as any).message);
    return;
  }
  await login();
};
const login = async () => {
  try {
    await ky
      .post('login', {
        json: {
          name: name.value,
          password: password.value,
        },
      })
      .json();
  } catch (err) {
    toast.error((err as any).message);
    return;
  }
  router.push({
    path: '/',
  });
};
</script>
<style scoped>
.form {
  --uno: 'py-6 flex=' ~col ' space-y-4';
}
.form > fieldset {
  --uno: 'space-x-2 flex items-center h-8';
}
label {
  --uno: 'w-16';
}
input {
  --uno: 'border-2 border-stone-400 focus:shadow rounded grow h-full px-2';
}
.submitButton {
  --uno: 'mt-auto rounded-2 bg-green-300 p-2 text-white';
}
</style>
