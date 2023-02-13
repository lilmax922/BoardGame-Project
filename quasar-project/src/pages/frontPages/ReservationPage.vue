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
const unavailableTime = ref([])
const reservationForm = reactive({
  selectedDate: `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`,
  selectedTime: '',
  selectedHour: 1,
  selectedPeople: 1,
  reserver: '',
  _id: reservations._id || '',
  loading: false
})

const availableTimeBtn = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM'
]

watch(
  () => reservationForm.selectedDate,
  async (value) => {
    try {
      // 取得使用者選擇的當天日期
      const { data } = await apiAuth.post('/reservations/getdate', {
        selectedDate: value
      })

      // 已被預約
      unavailableTime.value = []

      // 被預訂的時間與時數
      const reservedTimeAndHours = []

      // info 會是 controller 傳進來的 result
      data.result.forEach((info) => {
        reservedTimeAndHours.push({
          reservedTime: info.time,
          reservedHours: info.hour
        })
      })
      reservedTimeAndHours.forEach((info) => {
        const index = availableTimeBtn.findIndex(
          (availableTime) => availableTime === info.reservedTime
        )
        for (let i = index; i <= index + info.reservedHours; i++) {
          unavailableTime.value.push(availableTimeBtn[i])
          if (
            availableTimeBtn[i] ===
            availableTimeBtn[availableTimeBtn.length - 1]
          ) { return }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
)

const isDisableBtn = (time) => {
  return unavailableTime.value.includes(time)
}

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
</script>

<template lang="pug">
q-page#reservation(padding)
  div.q-ma-lg
    q-breadcrumbs
      q-breadcrumbs-el(icon='home' to='/')
      q-breadcrumbs-el(label='手刀預約' icon='mdi-calendar')
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
                    color="secondary"
                    @click="reservationForm.selectedTime = timeBtn"
                    v-for="timeBtn in availableTimeBtn"
                    :key="timeBtn"
                    :disable="isDisableBtn(timeBtn)"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                  )
                    | {{ timeBtn }}
              // > 選擇時數
              .text-h6 預約時數
              q-slider(v-model="reservationForm.selectedHour" markers marker-labels thumb-color="secondary" label-always :min="1" :max="10")
              .text-h6 預約人數
              q-slider(v-model="reservationForm.selectedPeople" markers marker-labels thumb-color="secondary" label-always :min="1" :max="12")
            q-card-section.col-4.flex.justify-around.items-center.column
              .text-h4.text-center.q-pb-xl 預約確認
              .flex.items-start.column
                p.text-h6 時間: {{ reservationForm.selectedDate }} {{ reservationForm.selectedTime }}
                p.text-h6 時數: {{ reservationForm.selectedHour }} 小時
                p.text-h6 人數: {{ reservationForm.selectedPeople }} 人
              .text-center
                q-btn(label="送出" type="submit" color="primary" :disable="reservationForm.loading" size="lg")
</template>

<style lang="scss">
#reservation{
  .notice {
    padding-bottom: 100px;
    .notice-header {
      color: $accent;
      border-left: 10px solid $accent;
      padding-left: 15px;
    }
  }
}
</style>
