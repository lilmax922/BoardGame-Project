<script setup>

</script>

<template lang="pug">
q-card.full-height.teamup-card(flat)
  q-img.teamup-img(src="../assets/images/teamup-type/mindset.jpg")
  q-card-section.q-gutter-sm
    .type-tag #策略 #陣營 #心機
    p.text-h4 3/3 揪揪揪...
  q-card-section.flex-center(horizontal)
    q-card-section.col-8
      q-list
        q-item
          q-item-section
            q-icon(name="mdi-calendar-clock" size="xs") &nbsp;2023/3/03 14:30
        q-item
          q-item-section
            q-icon(name="mdi-account-multiple" size="xs") &nbsp;4 / 7 人(尚可參加)
    q-card-section.col-4
      q-btn.join-btn(color="primary") 參加揪團
</template>

<style lang="scss">
.teamup-card {
  width: 350px;
  .teamup-img {
    height: 250px;
    object-position: center;
  }
  .join-btn {
    width: 90px;
  }
}
</style>
