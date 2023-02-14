import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { apiAuth } from 'src/boot/axios'
import Swal from 'sweetalert2'

export const useBoardgameStore = defineStore('boardgame', () => {
  const boardgames = reactive([])

  // 取張貼桌遊
  const getPostBoardgames = async () => {
    try {
      const { data } = await apiAuth.get('/boardgames')
      boardgames.splice(0, boardgames.length, ...data.result)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 取所有桌遊
  const getAllBoardgames = async () => {
    try {
      const { data } = await apiAuth.get('/boardgames/all')
      boardgames.push(...data.result)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 刪除桌遊
  const deleteBoardgame = async (_id) => {
    try {
      await apiAuth.patch('/boardgames/delete/' + _id, {
        status: 1
      })
      const index = boardgames.findIndex((item) => item._id === _id)
      boardgames.splice(index, 1)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '刪除成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 上傳桌遊
  const submitBoardgame = async (fd, _id) => {
    try {
      if (_id === '') {
        const { data } = await apiAuth.post('/boardgames', fd)
        boardgames.push(data.result)
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '新增成功'
        })
      } else {
        const { data } = await apiAuth.patch('/boardgames/' + _id, fd)
        const index = boardgames.findIndex((item) => item._id === _id)
        boardgames[index] = data.result
        Swal.fire({
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

  // getAllBoardgames()

  return {
    boardgames,
    getPostBoardgames,
    getAllBoardgames,
    deleteBoardgame,
    submitBoardgame
  }
})
