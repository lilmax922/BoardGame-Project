<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardgameStore } from 'src/stores/boardgame'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const boardgameStore = useBoardgameStore()
const { getPostBoardgames } = boardgameStore
getPostBoardgames()
const { boardgames } = storeToRefs(boardgameStore)

const filterTypes = ['陣營', '策略', '心機', '派對', '家庭', '兒童', '抽象', '卡牌']
const form = reactive({
  players: {
    min: 1,
    max: 15
  },
  gameTime: {
    min: 10,
    max: 60
  }
})

</script>

<template>
  <q-page id="explore-boardgames" padding>
    <div class="q-ma-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="mdi-home" to="/" />
        <q-breadcrumbs-el label="探索桌遊" />
      </q-breadcrumbs>
    </div>
    <div class="container">
      <section class="header flex items-center">
        <div class="text-h3 q-pr-lg" style="display: inline-block">
          探索桌遊
        </div>
        <q-btn label="我要預約" to="/reservation" color="primary" />
      </section>
      <section class="page-body">
        <div id="search-container">
          <div id="search-bar">
            <q-input name="search" placeholder="搜尋" outlined>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div id="filter-area" class="q-mt-md q-py-md">
            <div id="game-types">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-google-downasaur" size="sm" />
                <span class="text-h6 q-pa-md">桌遊類型</span>
              </div>
              <div class="flex flex-center q-gutter-md">
                <!-- <q-btn v-model="filterTypes" v-for="(type, idx) in filterTypes" :key="idx" :label="type" color="primary" size="lg" /> -->
              </div>
            </div>
            <div id="players">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-account-group" size="sm" />
                <div class="text-h6 q-pa-md">遊玩人數</div>
                <!-- <q-range v-model="form.players" class="q-px-lg" :min="1" :max="15" markers marker-labels
                  thumb-color="secondary" label-always :step="2" /> -->
              </div>
            </div>
            <div id="game-time">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-timer-sand" size="sm" />
                <div class="text-h6 q-pa-md">遊戲時間</div>
                <!-- <q-range v-model="form.gameTime" class="q-px-lg" :min="10" :max="60" markers marker-labels
                  thumb-color="secondary" label-always :step="10" /> -->
              </div>
            </div>
          </div>
        </div>
        <div id="cards-container">
          <div class="row q-gutter-sm-md">
            <div class="col-12 col-md-6 col-lg-3" v-for="boardgame in boardgames" :key="boardgame._id">
              <BoardgameCard class="bg-card q-mb-lg" v-bind="boardgame" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<style lang="scss">
#explore-boardgames {
  width: 100%;

  .header {
    padding-bottom: 55px;
  }

  .page-body {
    width: 100%;
    #cards-container {
      padding-top: 55px;
      .bg-card {
        width:60%;
      }
    }
    #search-container {
      .q-field__control {
        border-radius: 16px;
      }
      #filter-area {
        border: 1px solid #fff;
        border-radius: 16px;
      }
    }
  }
}
</style>
