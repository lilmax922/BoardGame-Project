<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReservationStore } from 'stores/reservation.js'
import { apiAuth } from 'src/boot/axios'

const reservationStore = useReservationStore()
const { submitReservation } = reservationStore
const { reservations } = storeToRefs(reservationStore)

const date = new Date()
const mask = 'YYYY-MM-DD'
const reservationForm = reactive({
  selectedDate: '',
  selectedTime: '',
  selectedHour: 1,
  selectedPeople: 1,
  reserver: '',
  _id: reservations._id || '',
  loading: false
})

const availableTimeBtn = reactive([
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: true },
  { time: '06:00 PM', available: true },
  { time: '07:00 PM', available: true },
  { time: '08:00 PM', available: true }
])

const max = computed(() => {
  const startIdx = availableTimeBtn.findIndex(btn => btn.time === reservationForm.selectedTime)
  if (startIdx > -1) {
    let i = startIdx
    while (availableTimeBtn[i] && availableTimeBtn[i].available) {
      i++
    }
    return (i - startIdx)
  } else return 11 // 總共 11 個時段
})

watch(() => reservationForm.selectedDate, async (value) => {
  try {
    // 沒有選擇日期的話按鈕全部為 false
    if (!reservationForm.selectedDate) {
      availableTimeBtn.forEach((btn) => {
        btn.available = false
        return btn
      })
      return
    }

    reservationForm.selectedTime = ''
    // 取得使用者選擇的當天日期
    const { data } = await apiAuth.post('/reservations/getdate', { selectedDate: value })

    // 被預訂的時間與時數
    const reservedTimeAndHours = []
    availableTimeBtn.forEach((btn) => {
      btn.available = true
      return btn
    })
    // console.log(availableTimeBtn)
    // console.log(reservedTimeAndHours)
    // info 會是 controller 傳進來的 result
    data.result.forEach((info) => {
      reservedTimeAndHours.push({
        reservedTime: info.time,
        reservedHours: info.hour
      })
    })

    reservedTimeAndHours.forEach((info) => {
      const index = availableTimeBtn.findIndex(
        (availableTime) => availableTime.time === info.reservedTime
      )

      // console.log(index)
      for (let i = index; i <= index + info.reservedHours; i++) {
        availableTimeBtn[i].available = false
        if (
          // disabled後，選的時間 btn = 最後一個時間 btn 的話
          availableTimeBtn[i] === availableTimeBtn[availableTimeBtn.length - 1]
        ) return
      }
    })
  } catch (error) {
    console.log(error)
  }
}
)

const onSubmit = async () => {
  reservationForm.loading = true

  await submitReservation({
    // 對應到 model 裡的取的參數
    _id: reservationForm._id,
    selectedDate: reservationForm.selectedDate,
    selectedTime: reservationForm.selectedTime,
    selectedHour: reservationForm.selectedHour,
    totalPeople: reservationForm.selectedPeople
  })
  reservationForm.loading = false
}

reservationForm.selectedDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`
</script>

<!-- <template lang="pug">
q-page#reservation(padding)
  div.q-ma-lg
    q-breadcrumbs
      template(#separator)
          q-icon(size="1.5em" name="chevron_right")
      q-breadcrumbs-el(icon='mdi-home' to='/')
      q-breadcrumbs-el(label='手刀預約')
  .container.q-gutter-md
    section.notice.q-mt-lg
      .text-h3.notice-header 預約須知
      div.q-pt-xl 預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約
    section.flex.justify-center
      q-card(style="width:1000px")
        q-form.q-gutter-md.flex.flex-center.column(@submit="onSubmit")
          // > 日期/時間
          q-card-section.flex.justify-around(horizontal)
            q-card-section.col-8.q-gutter-md
              .text-h6 預約日期
              .row.justify-between
                q-date.col-7(
                  v-model="reservationForm.selectedDate"
                  subtitle="請選擇預約日期"
                  :mask="mask"
                  today-btn
                  navigation-min-year-month="2023/02"
                  navigation-max-year-month="2023/12"
                )
                div.col-5.q-gutter-md.flex.justify-around(v-if="reservationForm.selectedDate !== ''")
                  q-btn(
                    :color="timeBtn.time === reservationForm.selectedTime ? 'info' : 'secondary'"
                    @click="reservationForm.selectedTime = timeBtn.time"
                    v-for="timeBtn in availableTimeBtn"
                    :key="timeBtn.time"
                    :disable="!timeBtn.available"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                  )
                    | {{ timeBtn.time }}
              // > 選擇時數
              .text-h6 預約時數
              q-slider(v-model="reservationForm.selectedHour" markers marker-labels thumb-color="secondary" label-always :min="1" :max="max")
              .text-h6 預約人數
              q-slider(v-model="reservationForm.selectedPeople" markers marker-labels thumb-color="secondary" label-always :min="1" :max="10")
            q-card-section.col-4.flex.justify-around.items-center.column
              .text-h4.text-center.q-pb-xl 預約確認
              .flex.items-start.column
                p.text-h6 時間: {{ reservationForm.selectedDate }} {{ reservationForm.selectedTime }}
                p.text-h6 時數: {{ reservationForm.selectedHour }} 小時
                p.text-h6 人數: {{ reservationForm.selectedPeople }} 人
              .text-center
                q-btn(label="送出" type="submit" color="primary" :disable="reservationForm.loading" size="lg")
</template> -->

<template>
  <q-page id="reservation" padding>
    <div class="q-ma-lg">
      <q-breadcrumbs>
        <template #separator>
          <q-icon name="chevron_right" size="1.5em" />
        </template>
        <q-breadcrumbs-el icon="mdi-home" to="/" />
        <q-breadcrumbs-el label="手刀預約" />
      </q-breadcrumbs>
    </div>
    <div class="container q-gutter-md">
      <section class="notice q-mt-lg">
        <div class="text-h3 notice-header">預約須知</div>
        <div class="q-pt-xl">
          <p>
            1.
            假日位置如遇客滿將保留１０分鐘，超過時間自動取消訂位不另行通知，請準時進場。
          </p>
          <p>2. 攜帶外食將酌收每人５０元清潔費，生日蛋糕、水、嬰兒食品除外。</p>
          <p>
            3.
            資料送出後待門市確認訂位狀況，並電話回覆訂位成功後才算完成訂位哦！（營業時間２４Ｈ內回覆）
          </p>
          <p>4. 如有其他問題、特殊情況可私訊聯繫粉專管理員。</p>
        </div>
      </section>
      <section class="flex justify-center">
        <q-card style="width: 1000px">
          <q-form
            class="q-gutter-md flex flex-center column"
            @submit="onSubmit"
          >
            <q-card-section class="flex justify-around" horizontal>
              <q-card-section class="col-8 q-gutter-md">
                <div class="text-h6">預約日期</div>
                <div class="row justify-between">
                  <q-date
                    class="col-7"
                    v-model="reservationForm.selectedDate"
                    subtitle="請選擇預約日期"
                    :mask="mask"
                    today-btn
                    navigation-min-year-month="2023/02"
                    navigation-max-year-month="2023/12"
                  />
                  <div
                    v-if="reservationForm.selectedDate !== ''"
                    class="col-5 q-gutter-md flex justify-around"
                  >
                    <q-btn
                      :color="
                        timeBtn.time === reservationForm.selectedTime
                          ? 'info'
                          : 'secondary'
                      "
                      @click="reservationForm.selectedTime = timeBtn.time"
                      v-for="timeBtn in availableTimeBtn"
                      :key="timeBtn.time"
                      :disable="!timeBtn.available"
                      checked-icon="task_alt"
                      unchecked-icon="panorama_fish_eye"
                    >
                      {{ timeBtn.time }}
                    </q-btn>
                  </div>
                  <div class="text-h6">預約時數</div>
                  <q-slider
                    v-model="reservationForm.selectedHour"
                    markers
                    marker-labels
                    thumb-color="secondary"
                    :min="1"
                    :max="max"
                  />
                  <div class="text-h6">預約人數</div>
                  <q-slider
                    v-model="reservationForm.selectedPeople"
                    markers
                    marker-labels
                    thumb-color="secondary"
                    :min="1"
                    :max="10"
                  />
                </div>
              </q-card-section>
              <q-card-section
                class="col-4 flex justify-around items-center column"
              >
                <div class="text-h4 text-center q-pb-xl">預約確認</div>
                <div class="flex items-start column">
                  <p class="text-h6">
                    時間: {{ reservationForm.selectedDate }}
                    {{ reservationForm.selectedTime }}
                  </p>
                  <p class="text-h6">
                    時數: {{ reservationForm.selectedHour }} 小時
                  </p>
                  <p class="text-h6">
                    人數: {{ reservationForm.selectedPeople }} 人
                  </p>
                </div>
                <div class="text-center">
                  <q-btn
                    label="送出"
                    type="submit"
                    color="primary"
                    :disable="reservationForm.loading"
                    size="lg"
                  />
                </div>
              </q-card-section>
            </q-card-section>
          </q-form>
        </q-card>
      </section>
    </div>
  </q-page>
</template>

<style lang="scss">
#reservation {
  .notice {
    padding-bottom: 100px;
    .notice-header {
      border-left: 15px solid $accent;
      padding-left: 1rem;
      color: $accent;
    }
  }
}
</style>
