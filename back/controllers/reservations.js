import reservations from '../models/reservations.js'
import teamups from '../models/teamups.js'

export const createReservation = async (req, res) => {
  try {
    const result = await reservations.create({
      reserver: req.user._id,
      date: req.body.selectedDate,
      time: req.body.selectedTime,
      hour: req.body.selectedHour,
      totalPeople: req.body.totalPeople
    })
    res.status(200).json({ success: true, message: '預約成功', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 代表重複
      res.status(400).json({ success: false, message: '桌遊名稱重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getReservation = async (req, res) => {
  try {
    // req.body.selectedDate 會撈到 model 的 reservations 整筆資料，取裡頭的 selectedTime 跟 hours
    const result1 = await reservations.find({ date: req.body.selectedDate }).select('time hour')
    const result2 = await teamups.find({ date: req.body.selectedDate }).select('time hour')
    res.status(200).json({ success: true, message: '查詢成功', result: [...result1, ...result2] })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 代表重複
      res.status(400).json({ success: false, message: '名稱重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getAllReservations = async (req, res) => {
  try {
    const result = await reservations.find()
    res.status(200).json({ success: true, message: '成功取得所有預約', result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editReservation = async (req, res) => {
  try {
    const result = await reservations.findByIdAndUpdate(req.params.id, {
      totalPeople: req.body.totalPeople
    }, { new: true })
    console.log(result)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到此預約' })
    } else {
      res.status(200).json({ success: true, message: '成功修改', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 代表重複
      res.status(400).json({ success: false, message: '名稱重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const deleteReservation = async (req, res) => {
  try {
    const result = reservations.findByIdAndUpdate(req.params.id)
    console.log(result)
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
    // 代表重複
      res.status(400).json({ success: false, message: '名稱重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
