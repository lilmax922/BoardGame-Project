<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'

const user = useUserStore()
const { avatar, nickname } = storeToRefs(user)
const { logout } = user

const lists = [
  { icon: 'mdi-account-edit', text: '會員資料', to: '/member/myInfo' },
  { icon: 'mdi-google-downasaur', text: '我的預約', to: '/member/myReservation' },
  { icon: 'mdi-account-group', text: '我的揪團', to: '/member/myTeamup' }
]
</script>

<!-- <template lang="pug">
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
</template> -->

<template>
  <q-layout view="hHh lpR fff">
    <q-header id="memberlayout" class="flex flex-center" reveal >
      <q-toolbar class="row" style="width: 100%;">
        <q-toolbar-title class="col-xs-4 col-md-3">
          <router-link style="text-decoration: none" to="/">
            <q-img src="../assets/logo.png" width="50px" />
            <span class="logo_name q-pl-md">揪遊</span>
          </router-link>
        </q-toolbar-title>

        <!-- 分頁 -->
        <q-tabs active-color="primary" dense class="gt-md col-md-6 flex items-end">
          <q-route-tab to="/" label="首頁" />
          <q-route-tab to="/exploreBGs" label="探索桌遊" />
          <q-route-tab to="/searchTeamups" label="揪團組隊" />
          <q-route-tab to="/teamup" label="我要揪團" />
          <q-route-tab to="/reservation" label="手刀預約" />
        </q-tabs>
        <q-space />

        <!-- navbar right_area -->
        <div class="flex items-center justify-end col-xs-8 col-md-3">
          <!-- 使用者下拉選單 -->
          <q-btn-dropdown class="q-ml-sm" flat>
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

             <!-- 會員 -->
             <q-item v-for="list in lists" :key="list" :to="list.to" clickable>
                <q-item-section avatar>
                  <q-icon :name="list.icon" />
                </q-item-section>
                <q-item-section>{{ list.text }}</q-item-section>
              </q-item>

            <q-separator />

            <q-item>
              <q-item-section>
                <q-btn @click="logout" icon="fa-solid fa-person-walking-arrow-right" label="登出" flat dense />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn class="lt-lg" dense flat round icon="menu">
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <q-item clickable to="/">
                <q-item-section>首頁</q-item-section>
              </q-item>
              <q-item clickable to="/exploreBGs">
                <q-item-section>探索桌遊</q-item-section>
              </q-item>
              <q-item clickable to="/searchTeamups">
                <q-item-section>揪團組隊</q-item-section>
              </q-item>
              <q-item clickable to="/teamup">
                <q-item-section>我要揪團</q-item-section>
              </q-item>
              <q-item clickable to="/reservation">
                <q-item-section>手刀預約</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>

    <q-drawer show-if-above :width="250" :breakpoint="500">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list padding>
          <q-item-label class="q-pa-sm" overline>會員編輯</q-item-label>
          <q-item
            v-for="list in lists"
            :key="list"
            :to="list.to"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="list.icon" />
            </q-item-section>
            <q-item-section>{{ list.text }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src='https://cdn.quasar.dev/img/material.png' style='height: 150px'>
      <div class="absolute-bottom bg-transparent">
        <q-avatar class="q-mb-sm" size="56px">
          <img :src="avatar" alt="avatar">
        </q-avatar>
        <div class="flex justify-between">
          <div class="text-weight-bold text-h6">{{ nickname }}</div>
          <q-btn @click="logout" icon='fa-solid fa-person-walking-arrow-right' label="登出" color="primary" dense/>
        </div>
      </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>

</style>
