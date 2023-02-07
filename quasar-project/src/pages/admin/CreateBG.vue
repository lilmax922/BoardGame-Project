<script setup>
import { ref } from 'vue'

const inputText = ref('')
</script>

<template lang="pug">
q-dialog(v-model="bgForm.dialog")
  q-layout
    q-page
      q-input(v-model="inputText")
</template>
