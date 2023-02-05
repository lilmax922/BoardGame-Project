<script setup>
</script>

<template lang="pug">
q-card.bg-card(flat)
  q-img.teamup-img(src="../assets/images/teamup-type/mindset.jpg" ratio=16/9)
  q-card-section.q-gutter-sm
    .type-tag #策略 #陣營 #心機
    .text-h4 3/3 揪揪揪...
  q-separator(inset)
  q-card-section.flex-center(horizontal)
    q-card-section.col-8.q-pt-none
      q-list
        q-item.q-pa-none
          q-item-section
            q-icon(name="mdi-calendar-clock" size="xs")
          q-item-section &nbsp;2023/3/03 14:30
        q-item.q-pa-none
          q-item-section.flex-auto
            q-icon(name="mdi-account-multiple" size="xs")
          q-item-section &nbsp;4 / 7 人 (尚可參加)
    q-card-section.col-4.q-pa-none
      q-btn.more-btn(color="primary") 參加揪團
</template>

<style lang="scss" scoped>
.q-item__section--main {
  flex: none;
  margin-left: 0;
}
</style>
