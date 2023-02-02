<template lang="pug">
q-page.flex-center.row
  #register
    h5.text-center 會員註冊
    q-form.q-gutter-md(filled @submit="register" @reset="onReset")
      q-input.dark.outlined.bottom-slots(v-model="registerForm.email" label="請輸入電子信箱" :rules="[rules.email, rules.required]")
        template(v-slot:prepend)
          q-icon(name="fa-solid fa-envelope")
        template(v-slot:append)
          q-icon(v-if="text !== ''" name="fa-solid fa-xmark" @click="text = ''" class="cursor-pointer")
      q-input.outlined(v-model="registerForm.phone" label="請輸入手機號碼" :rules="[rules.phone, rules.required]")
        template(v-slot:prepend)
          q-icon(name="fa-solid fa-mobile")
      q-input.dark.outlined(v-model="registerForm.nickname" label="請輸入暱稱" :rules="[rules.nickname, rules.required]")
        template(v-slot:prepend)
          q-icon(name="fa-solid fa-signature")
      q-input.dark.outlined(v-model="registerForm.password" label="請輸入密碼" :rules="[rules.required, rules.length]")
        template(v-slot:prepend)
          q-icon(name="fa-solid fa-key")
      q-input.dark.outlined(v-model="registerForm.confirmPassword" label="請再次確認密碼" :rules="[rules.confirmPassword, rules.required, rules.length]")
        template(v-slot:prepend)
          q-icon(name="fa-solid fa-key")
      q-btn(label="註冊" type="submit" color="primary")
      q-btn.q-ml-sm(label="重新輸入" type="reset" color="white" flat)

</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import validator from 'validator'
import { api } from 'src/boot/axios'

const $q = useQuasar()
const router = useRouter()

const text = ref('')
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
      color: 'secondary',
      textColor: 'white',
      icon: 'fa-solid fa-face-laugh-squint',
      message: '註冊成功'
    })
    router.push('/')
  } catch (error) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'fa-solid fa-face-sad-tear',
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
