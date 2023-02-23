<script setup>
import { reactive, ref, computed } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import { useTeamupStore } from 'src/stores/teamup'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const teamupStore = useTeamupStore()
const { _id } = storeToRefs(userStore)
const { teamups } = storeToRefs(teamupStore)

const joined = ref(false)
const teamup = reactive({
  _id: teamups._id || '',
  organizer: '',
  participant: [],
  date: '',
  time: '',
  hour: 1,
  currentPeople: 1,
  totalPeople: 1,
  cardImage: undefined,
  types: [],
  title: '',
  content: '',
  loading: false
});

// 取揪團資料
(async () => {
  try {
    const { data } = await api.get('/teamups/' + route.params.id)
    teamup._id = data.result._id
    teamup.organizer = data.result.organizer
    teamup.participant = data.result.participant
    teamup.date = data.result.date
    teamup.time = data.result.time
    teamup.hour = data.result.hour
    teamup.currentPeople = data.result.currentPeople
    teamup.totalPeople = data.result.totalPeople
    teamup.cardImage = data.result.cardImage
    teamup.types = data.result.types
    teamup.title = data.result.title
    teamup.content = data.result.content
    joined.value = teamup.participant.includes(_id.value)

    // 使用者可以看到 title 變更，但對爬蟲沒用
    document.title = '揪遊列國 | ' + teamup.title
  } catch (error) {
    Notify.create({
      message: '資料取得失敗',
      textColor: 'secondary',
      color: 'white',
      icon: 'mdi-emoticon-dead-outline',
      caption: error?.response?.data?.message || '發生錯誤',
      position: 'top'
    })
    router.go(-1)
  }
})()

const isFull = computed(() => {
  return teamup.currentPeople === teamup.totalPeople
})

const onSubmit = async () => {
  const joinTeamup = async () => {
    try {
      await apiAuth.post('/teamups/' + teamup._id)
      Notify.create({
        message: '參加成功',
        textColor: 'primary',
        icon: 'mdi-emoticon-happy-outline',
        color: 'white'
      })
    } catch (error) {
      Notify.create({
        message: '資料取得失敗',
        textColor: 'secondary',
        color: 'white',
        icon: 'mdi-emoticon-dead-outline',
        caption: error?.response?.data?.message || '發生錯誤'
      })
    }
  }
  const cancelTeamup = async () => {
    try {
      await apiAuth.post('/teamups/' + teamup._id)
      Notify.create({
        message: '取消成功',
        textColor: 'primary',
        icon: 'mdi-emoticon-happy-outline',
        color: 'white'
      })
    } catch (error) {
      Notify.create({
        message: '資料取得失敗',
        textColor: 'secondary',
        color: 'white',
        icon: 'mdi-emoticon-dead-outline',
        caption: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  if (!teamup.participant.includes(_id.value)) {
    teamup.currentPeople++
    await joinTeamup()
    teamup.participant.push(_id.value)
    teamup.loading = false
    joined.value = true
  } else {
    teamup.currentPeople--
    await cancelTeamup()
    teamup.participant.splice(teamup.participant.indexOf(_id.value, 1))
    teamup.loading = false
    joined.value = false
  }
}
</script>

<template>
  <q-page id="jointeamup" padding>
    <div class="container">
      <div class="breadcrumb">
        <q-breadcrumbs>
          <template #separator>
            <q-icon size="1.5em" name="chevron_right" />
          </template>
          <q-breadcrumbs-el icon="mdi-home" to="/" />
          <q-breadcrumbs-el label="揪團組隊" to="/searchTeamups" />
          <q-breadcrumbs-el label="參加揪團" />
        </q-breadcrumbs>
      </div>

      <q-form @submit="onSubmit" class="teamup_wrap q-mt-xl">
        <q-card class="teamup_card" flat>
          <q-card-section class="q-pa-xl" horizontal>
            <q-img class="card_img col-5" :src="teamup.cardImage" />

            <q-card-section class="info_area col-7 flex column">
              <div class="q-mb-lg">
                <span class="nickname_area">
                  <q-icon name="mdi-human-greeting" />
                  <span class="nickname">
                    {{ teamup.organizer.nickname }}
                  </span>
                </span>
              </div>

              <div class="title_area q-mt-md">
                <div class="text-h2">{{ teamup.title }}</div>
              </div>

              <q-separator class="q-my-lg" />

              <div class="content_area">
                <div class="text-h4">{{ teamup.content }}</div>
              </div>

              <div class="icon_area q-mt-lg">
                <div class="type">
                  <q-icon name="mdi-google-downasaur" class="q-pr-sm" />
                  <q-chip
                    v-for="type in teamup.types"
                    :key="type"
                    color="secondary"
                    size="md"
                  >
                    &#35;{{ type }}
                  </q-chip>
                </div>
                <div class="date flex items-center">
                  <q-icon name="mdi-calendar-clock" />
                  <div>
                    &nbsp; {{ new Date(teamup.date).toLocaleDateString() }}
                  </div>
                </div>
                <div class="time flex items-center">
                  <q-icon name="mdi-clock-time-four-outline"></q-icon>
                  <div>&nbsp; {{ teamup.time }}</div>
                </div>
                <div class="people flex items-center">
                  <q-icon name="mdi-account-group"></q-icon>
                  <div>
                    &nbsp; {{ teamup.currentPeople }} /
                    {{ teamup.totalPeople }} 人
                  </div>
                </div>
                <q-btn
                  v-if="!joined"
                  class="joinBtn"
                  type="submit"
                  :label="
                    teamup.currentPeople === teamup.totalPeople
                      ? '人數已滿'
                      : '參加揪團'
                  "
                  :disable="isFull"
                />
                <q-btn
                  v-else
                  class="cancelBtn"
                  type="submit"
                  label="取消參加"
                  :disable="teamup.loading"
                />
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
#jointeamup {
  width: 100%;

  .teamup_card {
    max-height: 800px;
    overflow: hidden;
    border-radius: 16px;

    & {
      font-size: 24px;
    }

    .card_img {
      max-height: 500px;
      border-radius: 16px;
    }

    .info_area {
      padding-left: 2rem;

      .nickname_area {
        border-radius: 8px;
        padding: 0.3rem;
        background-color: $secondary;
        color: $dark;
        font-size: 24px;

        .nickname {
          margin-left: 0.5rem;
        }
      }
      .joinBtn {
        width: 200px;
        position: absolute;
        top: 85%;
        right: 0;
        font-size: 20px;
        color: $dark;
        border-radius: 16px;
        background-color: $primary;

        &:hover {
          transition: 0.5s;
          border: 1px solid $primary;
          color: $primary;
          background-color: $dark;
        }
      }

      .cancelBtn {
        width: 200px;
        position: absolute;
        top: 85%;
        right: 0;
        font-size: 20px;
        color: $dark;
        border-radius: 16px;
        background-color: $secondary;

        &:hover {
          transition: 0.5s;
          border: 1px solid $secondary;
          color: $secondary;
          background-color: $dark;
        }
      }

      .type,
      .date,
      .time {
        margin-bottom: 1.5rem;
      }
    }
  }
}
</style>
