<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'

// const user = useUserStore()
// const users = storeToRefs(user)
</script>

<template>
  <q-page id="manage_account" padding>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h4 class="">帳號管理</h4>
        </div>
        <!-- account table -->
        <div class="col-12">
          <q-table title="Account Management"> </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
