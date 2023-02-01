<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import validator from 'validator'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'

const $q = useQuasar()
const router = useRouter()

const valid = ref(false)
const loading = ref(false)
const registerForm = reactive({
  email: '',
  phone: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  email (value) {
    return validator.isEmail(value) || '信箱格式錯誤'
  },
  length (value) {
    return (value.length > 4 && value.length <= 20) || '長度必須為 4 ~ 20 個字'
  }
}

const register = async () => {
  if (!valid.value) return
  loading.value = true
  try {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  } catch (error) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  }
}
</script>

<template>
  <div id="register" class="q-pa-md">
    <q-dialog :model-value="true">
      <q-form v-model="valid" class="q-gutter-md">

        <q-input filled v-model="email" label="電子信箱" lazy-rules
          :rules="[(val) => (val && val.length > 0) || '請輸入電子信箱']" />

        <q-input filled v-model="phone" label="手機號碼" hint="請輸入手機號碼" lazy-rules :rules="[
          (val) => (val !== null && val !== '') || '請輸入手機號碼',
          (val) => (val > 0 && val < 100) || 'Please type a real age',
        ]" />

        <q-input filled v-model="nickname" label="暱稱" lazy-rules :rules="[
          (val) => (val !== null && val !== '') || '請輸入暱稱',
          (val) => (val > 0 && val < 100) || 'Please type a real age',
        ]" />

        <q-input filled v-model="password" label="密碼" lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '請輸入密碼']" />

        <q-input filled v-model="confirmPassword" label="確認密碼" lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '請再次輸入密碼']" />

        <div>
          <q-btn label="註冊" type="submit" color="primary" :loading="loading" />
          <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
        </div>
      </q-form>
    </q-dialog>
  </div>
</template>
