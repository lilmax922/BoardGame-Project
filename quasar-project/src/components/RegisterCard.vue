<script setup>
import { Notify } from 'quasar'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import validator from 'validator'
import { api } from 'src/boot/axios'
import { useUserStore } from 'src/stores/user'

const { register } = useUserStore()
const emit = defineEmits(['showRegisterCard', 'closeDialog'])

const router = useRouter()

const text = ref('')
const registerForm = reactive({
  email: '',
  phone: '',
  nickname: '',
  password: '',
  isPwd: true,
  isConfirmPwd: true,
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
  nickname (value) {
    return (value.length >= 1 && value.length <= 12) || '長度必須為 1 ~ 12 個字'
  },
  confirmPassword (value) {
    return value === registerForm.password || '密碼不一致'
  }
}

const registerHandler = async () => {
  await register()
  setTimeout(() => {
    Notify.create({
      spinner: true,
      timeout: 1500,
      message: '註冊成功',
      textColor: 'primary',
      icon: 'mdi-emoticon-happy-outline',
      color: 'white'
    })
  }, 3000)
  router.push('/')
  emit('closeDialog')
}
</script>

<template lang="pug">
q-card#register-card(flat style="width:1500px")
  q-card-section(horizontal)
    q-card-section.col-4.flex-center.column
      q-btn.close-btn(icon="close" flat v-close-popup)
      p 已經註冊過了?
      q-btn(outline label="登入" color="white" @click="emit('showRegisterCard', false)")
        //- q-img(src="../assets/MAXXD.png" style="background:#EEE3D2; border-radius:16px")

    q-separator

    q-card-section.col-8.text-center
      h5.text-center 會員註冊
      q-form(@submit="registerHandler").q-gutter-sm
        q-input.bottom-slots(filled counter maxlength="不限" v-model='registerForm.email' label='電子信箱' :rules="[rules.required ,rules.email,]")
          template(v-slot:prepend)
            q-icon(name="mdi-email")
          template(v-slot:append)
            q-icon(v-if="text !== ''" name="fa-solid fa-xmark" @click="text = ''" class="cursor-pointer")
        q-input(filled counter maxlength="10" v-model="registerForm.phone" label="手機號碼" :rules="[rules.required, rules.phone]")
          template(v-slot:prepend)
            q-icon(name="mdi-cellphone")
        q-input(filled counter maxlength="20" v-model="registerForm.nickname" label="暱稱" :rules="[rules.required, rules.nickname]")
          template(v-slot:prepend)
            q-icon(name="mdi-draw")
        q-input(filled counter maxlength="12" v-model='registerForm.password' label='密碼' :rules="[rules.required, rules.password, rules.length]" :type="registerForm.isPwd ? 'password' : 'text'")
          template(v-slot:prepend)
            q-icon(name="mdi-lock")
          template(v-slot:append)
            q-icon.cursor-pointer(:name="registerForm.isPwd ? 'visibility_off' : 'visibility'" @click="registerForm.isPwd = !registerForm.isPwd")
        q-input(filled counter maxlength="12" v-model='registerForm.confirmPassword' label='確認密碼' :rules="[rules.required, rules.confirmPassword, rules.length]" :type="registerForm.isConfirmPwd ? 'password' : 'text'")
          template(v-slot:prepend)
            q-icon(name="mdi-check-all")
          template(v-slot:append)
            q-icon.cursor-pointer(:name="registerForm.isConfirmPwd ? 'visibility_off' : 'visibility'" @click="registerForm.isConfirmPwd = !registerForm.isConfirmPwd")
        q-btn(label="註冊" type="submit" color="primary")
</template>

<style lang="scss" scoped>
  .close-btn {
    top: -38%;
    left: 275%;
    z-index: 1;
  }
</style>
