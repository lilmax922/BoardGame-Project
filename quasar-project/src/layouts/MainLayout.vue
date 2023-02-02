<template lang="pug">
q-layout(view='hHh lpR fFf')
  q-header.bg-primary.text-white(elevated)
    q-toolbar
      q-avatar
        img(src='../assets/MAXXD.png')
      q-toolbar-title 差滴滴
      q-tabs(v-model='tabs')
        q-tab 探索桌遊
        q-tab 本期EVENT
        q-tab 手刀預約
        q-tab 揪團組隊
      q-space
      q-btn(icon='fa-solid fa-search')
      q-btn( icon='fa-solid fa-bell')
      q-btn(@click="showLogin" icon='fa-solid fa-user-plus')
      q-btn(@click="logout" icon='fa-solid fa-right-from-bracket')

  q-page-container
    q-page
      router-view

  q-dialog
    LoginDialog
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import RegisterDialog from 'src/components/RegisterDialog.vue'
import LoginDialog from 'src/components/LoginDialog.vue'

const user = useUserStore()
const { isLogin } = storeToRefs(user)
const { logout } = user

const tabs = ref('')
const showLogin = ref(false)
const showRegister = ref(false)
</script>
