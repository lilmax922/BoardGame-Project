<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import validator from 'validator'
import { api } from 'src/boot/axios'

const $q = useQuasar()
const router = useRouter()

const accept = ref(false)
const registerForm = reactive({
  email: '',
  phone: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  email (email) {
    return validator.isEmail(email) || '信箱格式錯誤'
  },
  phone (phone) {
    return validator.isMobilePhone(phone, 'zh-TW') || '手機號碼格式錯誤'
  },
  required (value) {
    return (value && value.length > 0) || '欄位必填'
  },
  length (value) {
    return (
      (value.length >= 4 && value.length <= 12) || '長度必須為 4 ~ 12 個字'
    )
  },
  confirmPassword (value) {
    return value === registerForm.password || '密碼不一致'
  }
}

// 送出表單
const register = async () => {
  try {
    await api.post('/users', registerForm)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: '註冊成功'
    })
    router.push('/')
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: '註冊失敗'
    })
  }
}

const onReset = () => {
  registerForm.email = null
  registerForm.password = null
  registerForm.confirmPassword = null
  accept.value = false
}
</script>

<template>
  <q-page class="flex-center">
    <div id="register">
      <q-form class="q-gutter-md" @submit="register" @reset="onReset">
        <q-input
          v-model="registerForm.email"
          label="請輸入電子信箱"
          :rules="[rules.email, rules.required]"
        />

        <q-input
          v-model="registerForm.phone"
          label="請輸入手機號碼"
          :rules="[rules.phone, rules.required]"
        />

        <q-input
          v-model="registerForm.nickname"
          label="請輸入暱稱"
          :rules="[rules.nickname, rules.required]"
        />

        <q-input
          v-model="registerForm.password"
          label="請輸入密碼"
          :rules="[rules.required, rules.length]"
        />

        <q-input
          v-model="registerForm.confirmPassword"
          label="請再次確認密碼"
          :rules="[rules.confirmPassword, rules.required, rules.length]"
        />

        <div class="">
          <q-btn label="註冊" type="submit" color="primary" />
          <q-btn
            label="重新輸入"
            type="reset"
            color="black"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
