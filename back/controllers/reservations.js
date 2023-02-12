import reservations from '../models/reservations.js'

export const createReservation = async (req, res) => {
  try {
    const result = await reservations.create({
      reserver: req.user._id,
      selectedDate: req.body.selectedDate,
      period: req.body.period,
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

// TODO: getReservation,getAllReservations,deleteReservation,editReservation
