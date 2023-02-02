<template lang="pug">
q-card#loginCard(flat style="width:1000px")
  q-card-section(horizontal)
    q-card-section.col-8
      h5.text-center 會員登入
      q-form(@submit="login" @reset="onReset")
        q-input(filled v-model='loginForm.email' label='電子信箱' :rules="[rules.required ,rules.email,]")
        q-input(filled v-model='loginForm.password' label='密碼' :rules="[rules.password, rules.required, rules.length]")
        q-input(filled v-model='loginForm.confirmPassword' label='確認密碼' :rules="[rules.confirmPassword, rules.required, rules.length]")
        q-btn(label="登入" type="submit" color="primary")

    q-separator

    q-card-section.col-4.flex.flex-center.column
      q-img(src="../assets/MAXXD.png" style="background:#EEE3D2; border-radius:16px")

</template>

<script setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import validator from 'validator'

const $q = useQuasar()

const accept = ref(false)
const loginForm = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  email (email) {
    return validator.isEmail(email) || '信箱格式錯誤'
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
    return value === loginForm.password || '密碼不一致'
  }
}

const login = async () => {
  try {
    $q.notify({
      color: 'primary',
      textColor: 'white',
      icon: 'fa-solid fa-face-laugh-squint',
      message: '登入成功'
    })
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
  loginForm.email = null
  loginForm.password = null
  loginForm.confirmPassword = null
  accept.value = false
}
</script>
