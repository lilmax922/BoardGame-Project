<script setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import validator from 'validator'
import { useUserStore } from 'src/stores/user'

const $q = useQuasar()
const user = useUserStore()

const emit = defineEmits(['showRegisterCard', 'closeDialog'])

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
  }
}

const login = async () => {
  await user.login(loginForm)
  $q.notify({
    color: 'accent',
    textColor: 'white',
    icon: 'mdi-robot-happy',
    message: '登入成功'
  })
  emit('closeDialog')
}
</script>

<template lang="pug">
q-card#login-card(flat style="width:1000px")
  q-card-section(horizontal)
    q-card-section.col-8.text-center
      h5.text-center 會員登入
      q-form(@submit="login")
        q-input(filled v-model='loginForm.email' label='電子信箱' :rules="[rules.required ,rules.email,]")
          template(v-slot:prepend)
            q-icon(name="fa-solid fa-envelope")
        q-input(filled v-model='loginForm.password' label='密碼' :rules="[rules.password, rules.required, rules.length]")
          template(v-slot:prepend)
            q-icon(name="fa-solid fa-key")
        q-btn(label="登入" type="submit" color="primary")

    q-separator

    q-card-section.col-4.flex-center.column
      q-btn.close-btn(icon="close" flat v-close-popup)
      p 還沒建立帳號嗎?
      q-btn(outline label="註冊" color="white" @click="emit('showRegisterCard', true)")
</template>

<style lang="scss" scoped>
  .close-btn {
    top: -30%;
    left: 35%;
  }
</style>
