<template lang="pug">
.q-pa-md
  q-card.my-card
    q-card-section
      .text-h6 Our Changing Planet
      .text-subtitle2 by John Doe
    q-tabs.text-teal(v-model='tab')
      q-tab(label='Tab one' name='one')
      q-tab(label='Tab two' name='two').

    q-separator
      q-tab-panels(v-model='tab' animated)
        q-tab-panel(name='one').

          The QCard component is a great way to display important pieces of grouped content.

        q-tab-panel(name='two').

          With so much content to display at once, and often so little screen real-estate, Cards have fast become the design pattern of choice for many companies, including the likes of Google and Twitter.
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('one')
</script>
