<script setup>
import { ref, reactive } from 'vue'

const selectedDate = ref(null)
const reservationForm = reactive({
  hours: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  minutes: [0, 15, 30, 45],
  selectedPeriod: 1,
  selectedPeople: 1
})
// const selectedPeriod = ref(1)
const reserveOptions = reactive(['一小時', '兩小時', '三小時', '四小時', '五小時', '六小時', '七小時', '八小時', '九小時', '十小時', '十一小時', '十二小時'])

const mask = 'YYYY-MM-DD HH:mm'

</script>

<template lang="pug">
q-page#reservation(padding)
  .container.q-gutter-md
    section
      q-breadcrumbs
        q-breadcrumbs-el(icon='home' to='/')
        q-breadcrumbs-el(label='手刀預約' icon='mdi-calendar')
    section.q-mt-lg
      .text-h3 預約須知
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, vitae, eum eveniet aliquid illum explicabo vero doloremque reiciendis eius minus tempore incidunt odit commodi nostrum quam necessitatibus provident molestias. Iure!
    section
      q-card
        q-form.q-gutter-md(@submit="onSubmit" style="max-width: 500px")
          // > 日期/時間
          q-card-section.col-6.q-gutter-md
            .text-h6 預約時段
              //- span.text-subtitle2 (日期與時間)
            q-input(filled v-model="selectedDate" label="日期與時間")
              template(v-slot:prepend)
                q-icon.cursor-pointer(name="event")
                  q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                    q-date(v-model="selectedDate" :mask="mask")
                      .row.items-center.justify-end
                        q-btn(v-close-popup label="Close" color="primary" flat)
              template(v-slot:append)
                q-icon.cursor-pointer(name="access_time")
                  q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                    q-time(
                      v-model="selectedDate"
                      :hour-options="reservationForm.hours" :minute-options="reservationForm.minutes"
                      :mask="mask"
                    )
                      .row.items-center.justify-end
                        q-btn(v-close-popup label="Close" color="primary" flat)
            //- q-select(v-model="selectedPeriod"
            //- filled
            //- transition-show="scale"
            //- transition-hide="scale"
            //- color='primary'
            //- label="請選擇預約時數"
            //- :options="reserveOptions"
            //- )
            //-   template(v-slot:prepend)
            //-     q-icon(name="event")
            // > 選擇時數
            .text-h6 預約時數
              span.text-subtitle2 (小時)
            q-slider(v-model="reservationForm.selectedPeriod" markers marker-labels thumb-color="secondary" label-always :min="1" :max="10")
            .text-h6 預約人數
            q-slider(v-model="reservationForm.selectedPeople" markers marker-labels thumb-color="secondary" label-always :min="1" :max="20")
</template>

<style>
</style>
