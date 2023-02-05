<script setup>
</script>

<template lang="pug">
q-btn-dropdown(flat)
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
    q-separator
    q-item
      q-item-section
        q-btn(@click="logout" icon='fa-solid fa-person-walking-arrow-right' label="登出")
</template>
