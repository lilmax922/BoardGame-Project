<script setup>
import { reactive, ref } from 'vue'

const drawer = ref(false)
const menuList = reactive([
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
])

</script>

<template lang="pug">
q-layout(view='hHh Lpr lff') // ? .shadow-2.rounded-borders
  q-header(bordered)
    q-toolbar
      q-btn(flat @click='drawer = !drawer' round dense icon='menu')
      q-toolbar-title 後台管理
  q-drawer(v-model='drawer' show-if-above :width='200' :breakpoint='500' bordered)
    q-scroll-area.fit
      q-list
        template(v-for='(menuItem, index) in menuList' :key='index')
          q-item(clickable :active="menuItem.label === 'Outbox'" v-ripple)
            q-item-section(avatar)
              q-icon(:name='menuItem.icon')
            q-item-section {{ menuItem.label }}
          q-separator(:key="'sep' + index" v-if='menuItem.separator')
  q-page-container
    router-view
</template>

<style scoped>
</style>
