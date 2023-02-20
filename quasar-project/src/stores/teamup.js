import { defineStore } from 'pinia'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from 'src/boot/axios'

export const useTeamupStore = defineStore('teamup', () => {
  const teamups = reactive([])

  // 發起揪團
  async function submitTeamup (form, _id) {
    try {
      if (form.get('_id') === '') {
        const { data } = await apiAuth.post('/teamups', form)
        teamups.push(data.result)
        await Swal.fire({
          icon: 'success',
          title: '成功',
          text: '揪團成功~'
        })
      } else {
        const { data } = await apiAuth.patch('/teamups/' + _id, form)
        const index = teamups.findIndex(teamup => teamup._id === _id)
        teamups[index] = data.result
        await Swal.fire({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
      }
      // this.router.push('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 取所有揪團
  const getAllTeamups = async () => {
    try {
      const { data } = await apiAuth.get('/teamups/all')
      teamups.splice(0, teamups.length, ...data.result)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 參加揪團
  const joinTeamup = async (form) => {
    try {
      const { data } = await apiAuth.post('/teamups/' + form._id)
      await Swal.fire({
        icon: 'success',
        title: '成功',
        text: '參加成功~'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 取消參加
  const cancelTeamup = async (form) => {
    try {
      const { data } = await apiAuth.post('/teamups/' + form._id)
      await Swal.fire({
        icon: 'success',
        title: '成功',
        text: '取消成功~'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const deleteTeamup = async (_id) => {
    try {
      await apiAuth.patch('/teamups/delete/' + _id)
      const index = teamups.findIndex(teamup => teamup._id === _id)
      teamups.splice(index, 1)
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
    teamups,
    submitTeamup,
    joinTeamup,
    cancelTeamup,
    getAllTeamups,
    deleteTeamup
  }
})
