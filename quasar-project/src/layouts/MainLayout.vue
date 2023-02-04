<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import LoginCard from 'src/components/LoginCard.vue'
import RegisterCard from 'src/components/RegisterCard.vue'

const user = useUserStore()
const { isLogin } = storeToRefs(user)
const { logout } = user

const tab = ref('')
const showLoginCard = ref(false)
const showRegisterCard = ref(false)

const toggleRegisterCardHandler = (type) => {
  showRegisterCard.value = type
}
</script>

<template lang="pug">
q-layout(view='hHh lpR fFf')
  q-header.bg-primary.text-white(elevated)
    q-toolbar
      q-avatar
        img(src='../assets/MAXXD.png')
      q-toolbar-title 差滴滴
      q-tabs(v-model="tab")
        q-route-tab(to="/exploreBG") 探索桌遊
        q-route-tab(to="/event") 本期EVENT
        q-route-tab(to="/reserve") 手刀預約
        q-route-tab(to="/teamup") 揪團組隊
      q-space
      q-btn(icon='fa-solid fa-search')
      q-btn(v-if="isLogin" icon='fa-solid fa-bell')
      q-btn(v-if="!isLogin" @click="showLoginCard = true" label="會員登入" size="lg")
      p(v-if="isLogin") {{ user.nickname }}
      q-btn(v-if="isLogin" @click="logout" icon='fa-solid fa-person-walking-arrow-right')

  q-page-container
    router-view

  //- 登入註冊
  q-dialog(v-model="showLoginCard")
    LoginCard(v-if="!showRegisterCard" @showRegisterCard="toggleRegisterCardHandler")
    RegisterCard(v-if="showRegisterCard" @showRegisterCard="toggleRegisterCardHandler")
</template>
