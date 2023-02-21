<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import LoginCard from 'src/components/LoginCard.vue'
import RegisterCard from 'src/components/RegisterCard.vue'

const user = useUserStore()
const { isLogin, isAdmin, avatar, nickname, showLoginCard } = storeToRefs(user)
const { logout } = user

const tab = ref('')
const showRegisterCard = ref(false)

const toggleRegisterCardHandler = (type) => {
  showRegisterCard.value = type
}
const close = () => {
  showLoginCard.value = false
}
</script>

<template lang="pug">
q-layout(view='hHh lpR fff')
  q-header.bg-primary(bordered)
    q-toolbar
      q-avatar
        img(src='../assets/MAXXD.png')
      q-toolbar-title.logo_name 揪遊列國
      q-tabs.tabs(v-model="tab")
        q-route-tab(to="/exploreBGs") 探索桌遊
        q-route-tab(to="/searchTeamups") 揪團組隊
        q-route-tab(to="/teamup") 我要揪團
        q-route-tab(to="/reservation") 手刀預約
      q-space
      q-btn(v-if="isLogin" icon='mdi-bell' rounded flat)
        q-badge(color="accent" floating :label="5")
        q-menu(fit anchor="bottom left" self="top middle")
          q-card
            q-card-section.text-subtitle2 會員通知
            q-separator
            q-card-section
      q-btn(v-if="!isLogin" @click="showLoginCard = true" icon="mdi-account-circle" flat dense size="lg")
      q-btn-dropdown(v-if="isLogin" flat)
        template(#label)
          q-avatar
            q-img(:src="avatar")
        q-list.q-pa-xs
          q-item
            q-item-section(avatar)
              q-avatar
                q-img(:src="avatar")
            q-item-section.flex-center()
              div {{ nickname }}
          q-separator
          q-item-label.q-pa-sm(overline) 我的主頁
          q-item(clickable v-if="isLogin && isAdmin" to="/admin")
            q-item-section(avatar)
              q-icon(name="mdi-account-cog")
            q-item-section 管理者後台
          q-item(clickable v-if="!isAdmin" to="/member/myInfo")
            q-item-section(avatar)
              q-icon(name="mdi-account-edit")
            q-item-section 會員資料
          q-item(clickable v-if="!isAdmin" to="/member/myReservation")
            q-item-section(avatar)
              q-icon(name="mdi-google-downasaur")
            q-item-section 我的預約
          q-item(clickable v-if="!isAdmin" to="/member/myTeamup")
            q-item-section(avatar)
              q-icon(name="mdi-account-group")
            q-item-section 我的揪團
          q-separator(v-if="isLogin")
          q-item(v-if="isLogin")
            q-item-section
              q-btn(@click="logout" icon='fa-solid fa-person-walking-arrow-right' label="登出" flat dense)
  q-page-container
    router-view

  //- 登入註冊
  q-dialog(v-model="showLoginCard" persistent)
    LoginCard(v-if="!showRegisterCard" @showRegisterCard="toggleRegisterCardHandler" @closeDialog="close")
    RegisterCard(v-if="showRegisterCard" @showRegisterCard="toggleRegisterCardHandler" @closeDialog="close")
</template>

<style lang="scss">
.logo_name,
.tabs {
  color: $dark;

  .q-tab__indicator {
    height: 3px;
  }
}
.tabs {
  font-weight: 700;
}
</style>
