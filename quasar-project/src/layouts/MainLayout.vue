<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'

const user = useUserStore()
const { isLogin } = storeToRefs(user)
const tabs = ref('')
// const registerDialog = ref(false)
</script>

<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-avatar>
            <img src="../assets/MAXXD.png" />
          </q-avatar>
          <q-toolbar-title>差滴滴</q-toolbar-title>
          <q-tabs v-model="tabs">
            <q-tab>探索桌遊</q-tab>
            <q-tab>本期EVENT</q-tab>
            <q-tab>手刀預約</q-tab>
            <q-tab>揪團組隊</q-tab>
          </q-tabs>
          <q-space />
          <q-btn icon="fa-solid fa-search" />
          <q-btn v-if="isLogin" icon="fa-solid fa-bell" />
          <q-btn v-if="!isLogin" icon="fa-solid fa-user-plus" to="/register" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- <q-footer class="bg-primar text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
    </q-layout>
  </div>
</template>
