<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import LoginCard from 'src/components/LoginCard.vue'
import RegisterCard from 'src/components/RegisterCard.vue'

const user = useUserStore()
const { isLogin, isAdmin, avatar, nickname, showLoginCard } = storeToRefs(user)
const { logout } = user

const showRegisterCard = ref(false)
const rightDrawerOpen = ref(false)

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const toggleRegisterCardHandler = (type) => {
  showRegisterCard.value = type
}
const close = () => {
  showLoginCard.value = false
}
</script>

<template>
  <q-layout view="hHh lpR fff">
    <q-header class="header flex flex-center" reveal>
      <q-toolbar class="row" style="width: 100%;">
        <q-toolbar-title class="col-xs-6 col-md-3" shrink>
          <!-- <q-img src="../assets/MAXXD.png" width="80px" /> -->
          <router-link class="logo_name" to="/"><span class="q-pl-md">揪遊Lego</span></router-link>
        </q-toolbar-title>

        <!-- 分頁 -->
        <q-tabs active-color="white" class="gt-md col-md-6 flex items-end">
          <q-route-tab to="/exploreBGs" label="探索桌遊" />
          <q-route-tab to="/searchTeamups" label="揪團組隊" />
          <q-route-tab to="/teamup" label="我要揪團" />
          <q-route-tab to="/reservation" label="手刀預約" />
        </q-tabs>
        <q-space />

        <!-- navbar right_area -->
        <div class="flex justify-end col-xs-6 col-md-3">
          <!-- 通知 btn -->
          <q-btn v-if="isLogin" icon="mdi-bell" dense rounded flat>
            <q-badge color="secondary" floating :label="5" />
            <q-menu fit anchor="bottom left" self="top middle">
              <q-card>
                <q-item>
                  <q-item-label class="q-pa-sm" overline>我的通知</q-item-label>
                </q-item>
                <!-- <q-separator /> -->
                <q-card-section>
                  內容
                </q-card-section>
                <q-card-section></q-card-section>
              </q-card>
            </q-menu>
          </q-btn>
          <!-- 登入/註冊 btn -->
          <q-btn v-if="!isLogin" @click="showLoginCard = true" icon="mdi-account-circle" flat dense size="lg" />
          <!-- 使用者下拉選單 -->
          <q-btn-dropdown v-if="isLogin" class="q-ml-sm" flat>
            <template #label>
              <q-avatar>
                <q-img :src="avatar" />
              </q-avatar>
            </template>
            <q-list class="q-pa-xs">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-img :src="avatar"></q-img>
                  </q-avatar>
                </q-item-section>
                <q-item-section class="flex-center">
                  {{ nickname }}
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item-label class="q-pa-sm" overline>我的主頁</q-item-label>
              <!-- 管理者 -->
              <q-item v-if="isLogin && isAdmin" to="/admin" clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-account-cog" />
                </q-item-section>
                <q-item-section>管理者後台</q-item-section>
              </q-item>

              <!-- 會員 -->
              <q-item v-if="!isAdmin" to="/member/myInfo" clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-account-edit" />
                </q-item-section>
                <q-item-section>會員資料</q-item-section>
              </q-item>

              <q-item v-if="!isAdmin" to="/member/myReservation" clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-google-downasaur" />
                </q-item-section>
                <q-item-section>我的預約</q-item-section>
              </q-item>

              <q-item v-if="!isAdmin" to="/member/myTeamup" clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-account-group" />
                </q-item-section>
                <q-item-section>我的揪團</q-item-section>
              </q-item>

              <q-separator v-if="isLogin" />
              <q-item v-if="isLogin">
                <q-item-section>
                  <q-btn @click="logout" icon="fa-solid fa-person-walking-arrow-right" label="登出" flat dense />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <span class="lt-lg">
          <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
        </span>
      </q-toolbar>
    </q-header>

    <!-- 右側抽屜 -->
    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered :width="200" :breakpoint="200">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showLoginCard" persistent>
      <LoginCard v-if="!showRegisterCard" @showRegisterCard="toggleRegisterCardHandler" @closeDialog="close" />
      <RegisterCard v-if="showRegisterCard" @showRegisterCard="toggleRegisterCardHandler" @closeDialog="close" />
    </q-dialog>

    <q-footer class="bg-primary text-dark">
      <q-toolbar>
        <q-toolbar>
          <q-avatar class="q-mr-sm">
            <img src="../assets/MAXXD.png" />
          </q-avatar>
          <span class="text-center" style="font-size:14px;">©2023 泰山職訓網頁 專題設計 by 胡俊宇</span>
        </q-toolbar>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
header {
  height: 65px;
}
.header {
  background-color: rgba(254, 100, 29, 0.95);
  .logo_name {
    text-decoration: none;
  }
}
.logo_name,
.q-tabs {
  color: $dark;
}
  .q-tab {
    padding: 15px 10px;
  }

  .q-tab__label {
    font-size: 18px;
  }

  .q-tab__indicator {
    height: 3.5px;
  }

</style>
