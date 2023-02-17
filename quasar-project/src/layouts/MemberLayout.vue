<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'

const user = useUserStore()
const { avatar, nickname } = storeToRefs(user)
const { logout } = user

const userName = nickname.value

const drawer = ref(false)

const lists = [
  { icon: 'mdi-account-edit', text: '會員資料', to: '/member/myInfo' },
  { icon: 'mdi-google-downasaur', text: '我的預約', to: '/member/myReservation' },
  { icon: 'mdi-account-group', text: '我的揪團', to: '/member/myTeamup' },
  { icon: 'mdi-home', text: '回首頁', to: '/' }
]
</script>

<template lang="pug">
q-layout(view='hHh Lpr lff')
  q-header(bordered)
    q-toolbar
      q-btn(flat @click='drawer = !drawer' round dense icon='mdi-menu')
      q-toolbar-title 會員後台
  q-drawer(v-model='drawer' show-if-above :width='250' :breakpoint='500')
    q-scroll-area(style='height: calc(100% - 150px); margin-top: 150px;')
      q-list(padding)
        q-item-label.q-pa-sm(overline) 會員編輯
        q-item(
          v-for="list in lists"
          :to="list.to"
          clickable
          v-ripple
        )
          q-item-section(avatar)
            q-icon(:name="list.icon")
          q-item-section {{ list.text }}
    q-img.absolute-top(src='https://cdn.quasar.dev/img/material.png' style='height: 150px')
      .absolute-bottom.bg-transparent
        q-avatar.q-mb-sm(size='56px')
          img(:src='avatar')
        .flex.justify-between
          .text-weight-bold.text-h6 {{ nickname }}
          q-btn(@click="logout" icon='fa-solid fa-person-walking-arrow-right' label="登出" color="primary" dense)

  q-page-container
    router-view
</template>
