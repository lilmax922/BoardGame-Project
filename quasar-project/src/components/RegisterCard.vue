<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import validator from 'validator'
import { api } from 'src/boot/axios'

const emit = defineEmits(['showRegisterCard', 'closeDialog'])

const $q = useQuasar()
const router = useRouter()

const text = ref('')
const registerForm = reactive({
  email: '',
  phone: '',
  nickname: '',
  password: '',
  isPwd: true,
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

const register = async () => {
  try {
    await api.post('/users', registerForm)
    $q.notify({
      spinner: true,
      timeout: 1500,
      color: 'accent',
      textColor: 'white',
      message: '請稍等'
    })
    setTimeout(() => {
      $q.notify({
        color: 'accent',
        textColor: 'white',
        icon: 'mdi-robot-happy',
        message: '註冊成功'
      })
    }, 3000)
    router.push('/')
    emit('closeDialog')
  } catch (error) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'fa-solid fa-face-sad-tear',
      message: '註冊失敗'
    })
  }
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
      q-form(@submit="register").q-gutter-sm
        q-input.bottom-slots(filled counter maxlength="不限" v-model='registerForm.email' label='電子信箱' :rules="[rules.required ,rules.email,]")
          template(v-slot:prepend)
            q-icon(name="fa-solid fa-envelope")
          template(v-slot:append)
            q-icon(v-if="text !== ''" name="fa-solid fa-xmark" @click="text = ''" class="cursor-pointer")
        q-input(filled counter maxlength="10" v-model="registerForm.phone" label="手機號碼" :rules="[rules.required, rules.phone]")
          template(v-slot:prepend)
            q-icon(name="fa-solid fa-mobile")
        q-input(filled counter maxlength="20" v-model="registerForm.nickname" label="暱稱" :rules="[rules.required, rules.nickname]")
          template(v-slot:prepend)
            q-icon(name="fa-solid fa-signature")
        q-input(filled counter maxlength="12" v-model='registerForm.password' label='密碼' :rules="[rules.required, rules.password, rules.length]" :type="registerForm.isPwd ? 'password' : 'text'")
          template(v-slot:prepend)
            q-icon(name="fa-solid fa-key")
          template(v-slot:append)
            q-icon.cursor-pointer(:name="registerForm.isPwd ? 'visibility_off' : 'visibility'" @click="registerForm.isPwd = !registerForm.isPwd")
        q-input(filled counter maxlength="12" v-model='registerForm.confirmPassword' label='確認密碼' :rules="[rules.required, rules.confirmPassword, rules.length]" :type="registerForm.isPwd ? 'password' : 'text'")
          template(v-slot:prepend)
            q-icon(name="fa-solid fa-check-double")
          template(v-slot:append)
            q-icon.cursor-pointer(:name="registerForm.isPwd ? 'visibility_off' : 'visibility'" @click="registerForm.isPwd = !registerForm.isPwd")
        q-btn(label="註冊" type="submit" color="primary")
</template>

<style lang="scss" scoped>
  .close-btn {
    top: -38%;
    left: 275%;
    z-index: 1;
  }
</style>
