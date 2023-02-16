<script setup>
import { useUserStore } from 'src/stores/user'
import { storeToRefs } from 'pinia'

const user = useUserStore()
const { avatar, nickname } = storeToRefs(user)
</script>

<template>
  <q-page id="my_reservation">
    <div class="container">
      <div class="member_area">
        <div class="row">
          <div class="col-12">
            <q-avatar>
              <q-img :src="avatar" />
            </q-avatar>
            <span class="q-pa-lg">{{ nickname }}</span>
          </div>
          <div class="col-3">
            <q-item>
              <q-item-section>
                <div>我的預約</div>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </div>
  </q-page>
  </template>

<style lang="scss" scoped>
#my_reservation {
  .member_area {
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 4rem;
  }
}
</style>
