<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'

const user = useUserStore()
const { avatar } = storeToRefs(user)
const { logout } = user

const drawer = ref(false)
</script>

<template lang="pug">
q-layout(view='hHh Lpr lff')
  q-header(bordered)
    q-toolbar
      q-btn(flat @click='drawer = !drawer' round dense icon='mdi-menu')
      q-toolbar-title 後台管理
  q-drawer(v-model='drawer' show-if-above :width='200' :breakpoint='500')
    q-scroll-area(style='height: calc(100% - 150px); margin-top: 150px;')
      q-list(padding)
        q-item-label.q-pa-sm(overline) 會員管理
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-account-edit')
          q-item-section 帳號管理
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-calendar-account')
          q-item-section 預約管理
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-account-group')
          q-item-section 揪團管理
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-bullhorn')
          q-item-section 活動管理
        q-item(clickable v-ripple to="/admin/manageBG")
          q-item-section(avatar)
            q-icon(name='mdi-google-downasaur')
          q-item-section 桌遊管理
        q-separator
        q-item-label.q-pa-sm(overline) 前台編輯
        q-item(clickable v-ripple to="/")
          q-item-section(avatar)
            q-icon(name='mdi-home-edit')
          q-item-section 首頁
        q-item(clickable v-ripple to="/editBoardgames")
          q-item-section(avatar)
            q-icon(name='mdi-puzzle-edit')
          q-item-section 探索桌遊
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-dance-ballroom')
          q-item-section 本期EVENT
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-account-group')
          q-item-section 揪團組隊
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-calendar-edit')
          q-item-section 手刀預約
    q-img.absolute-top(src='https://cdn.quasar.dev/img/material.png' style='height: 150px')
      .absolute-bottom.bg-transparent
        q-avatar.q-mb-sm(size='56px')
          img(:src='avatar')
        .flex.justify-between
          .text-weight-bold.text-h6 Admin
          q-btn(@click="logout" icon='fa-solid fa-person-walking-arrow-right' label="登出" color="primary" dense)

  q-page-container
    router-view
</template>

<style scoped>
</style>
