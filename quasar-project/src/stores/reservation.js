import { defineStore } from 'pinia'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from 'src/boot/axios'

export const useReservationStore = defineStore('reservation', () => {
  const reservations = reactive([])

  async function submitReservation (form, _id) {
    try {
      console.log(_id)
      if (form._id === '') {
        const { data } = await apiAuth.post('/reservations', form)
        reservations.push(data.result)
        await Swal.fire({
          icon: 'success',
          title: '成功',
          text: '預約成功~'
        })
      } else {
        const { data } = await apiAuth.patch('/reservations/' + form._id, form)
        const index = reservations.findIndex(reservation => reservation._id === form._id)
        reservations[index] = data.result
        await Swal.fire({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const getAllReservations = async () => {
    try {
      const { data } = await apiAuth.get('/reservations/all')
      reservations.splice(0, data.result.length, ...data.result)
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const deleteReservation = async (_id) => {
    try {
      await apiAuth.patch('/reservations/delete/' + _id)
      const index = reservations.findIndex(reservation => reservation._id === _id)
      reservations.splice(index, 1)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '預約刪除成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  return {
    reservations,
    submitReservation,
    getAllReservations,
    deleteReservation
  }
})
