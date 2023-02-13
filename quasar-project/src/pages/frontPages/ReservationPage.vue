<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReservationStore } from 'stores/reservation.js'
import { apiAuth } from 'src/boot/axios'

const reservationStore = useReservationStore()
const { submitReservation } = reservationStore
const { reservations } = storeToRefs(reservationStore)

const mask = 'YYYY-MM-DD'
const unavailableTime = ref([])
const reservationForm = reactive({
  hours: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  minutes: [0, 15, 30, 45],
  selectedDate: '',
  selectedTime: '',
  selectedHour: 1,
  selectedPeople: 1,
  reserver: '',
  _id: reservations._id || '',
  loading: false
})

const availableTimeBtn = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']

watch(() => reservationForm.selectedDate, async (value) => {
  try {
    // 取得使用者選擇的當天日期
    const { data } = await apiAuth.post('/reservations/getdate', { selectedDate: value })

    // 已被預約
    unavailableTime.value = []

    // 被預訂的時間與時數
    const reservedTimeAndHours = []

    // info 會是 controller 傳進來的 result
    data.result.forEach(info => {
      console.log(info)
      reservedTimeAndHours.push({
        reservedTime: info.time,
        reservedHours: info.hour
      })
    })
    console.log(reservedTimeAndHours)
    reservedTimeAndHours.forEach((info) => {
      const index = availableTimeBtn.findIndex((availableTime) => availableTime === info.reservedTime)
      console.log(index)
      for (let i = index; i <= index + info.reservedHours; i++) {
        console.log(availableTimeBtn[i])
        unavailableTime.value.push(availableTimeBtn[i])
        if (availableTimeBtn[i] === availableTimeBtn[availableTimeBtn.length - 1]) return
      }
    })
    console.log(unavailableTime.value)
  } catch (error) {
    console.log(error)
  }
})

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
    section.q-mt-lg
      .text-h3 預約須知
      div 預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約須知預約
    section.flex.justify-center
      q-card(style="width:1000px")
        q-form.q-gutter-md.flex.flex-center.column(@submit="onSubmit")
          // > 日期/時間
          q-card-section.flex.justify-around(horizontal)
            q-card-section(style="width:600px").col-8.q-gutter-md
              .text-h6 預約時間
              q-date(
                v-model="reservationForm.selectedDate"
                subtitle="請選擇預約日期"
                :mask="mask"
                today-btn
                navigation-min-year-month="2023/02"
                navigation-max-year-month="2023/12"
              )
              div(v-if="reservationForm.selectedDate !== ''")
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
            q-card-section(style="width:400px").col-4.q-gutter-md.flex.flex-center.column
              .text-h4.text-center.q-pb-xl 預約確認
              .flex.items-start.column
                p.text-h6 時間: {{ reservationForm.selectedDate }} {{ reservationForm.selectedTime }}
                p.text-h6 時數: {{ reservationForm.selectedHour }} 小時
                p.text-h6 人數: {{ reservationForm.selectedPeople }} 人
                q-card-section
                  q-btn(label="送出" type="submit" color="primary" :disable="reservationForm.loading" size="lg")
</template>
