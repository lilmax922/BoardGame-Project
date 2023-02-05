<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import LoginCard from 'src/components/LoginCard.vue'
import RegisterCard from 'src/components/RegisterCard.vue'

const user = useUserStore()
const { isLogin, avatar } = storeToRefs(user)
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
      | &nbsp; 差滴滴
      //- q-toolbar-title 差滴滴
      q-space
      q-tabs(v-model="tab")
        q-route-tab(to="/exploreBG") 探索桌遊
        q-route-tab(to="/event") 本期EVENT
        q-route-tab(to="/teamup") 揪團組隊
        q-route-tab(to="/reserve") 手刀預約
      q-space
      q-btn(icon='fa-solid fa-search')
      q-btn(v-if="isLogin" icon='fa-solid fa-bell')
        <q-badge color="accent" floating :label="5"></q-badge>
      q-btn(v-if="!isLogin" @click="showLoginCard = true" label="會員登入" size="lg")
      q-btn-dropdown(v-if="isLogin" flat)
        template(#label)
          q-avatar
            q-img(src="https://picsum.photos/150/150")
        q-list.q-pa-xs
          q-item(v-ripple)
            q-item-section(avatar)
              q-avatar
                q-img(src="https://picsum.photos/500/500")
            q-item-section NickName
          q-separator
          q-item-label.q-pa-sm(overline) 我的主頁
          q-item(clickable)
            q-item-section(avatar)
              q-icon(name="mdi-google-downasaur")
            q-item-section 我的預約
          q-item(clickable)
            q-item-section(avatar)
              q-icon(name="mdi-account-group")
            q-item-section 我的揪團
          q-item(clickable)
            q-item-section(avatar)
              q-icon(name="mdi-human-greeting")
            q-item-section 我的報名
          q-separator(v-if="isLogin")
          q-item(v-if="isLogin")
            q-item-section
              q-btn(@click="logout" icon='fa-solid fa-person-walking-arrow-right' label="登出")
  q-page-container
    router-view

  //- 登入註冊
  q-dialog(v-model="showLoginCard")
    LoginCard(v-if="!showRegisterCard" @showRegisterCard="toggleRegisterCardHandler")
    RegisterCard(v-if="showRegisterCard" @showRegisterCard="toggleRegisterCardHandler")
</template>
