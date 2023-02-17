import teamups from '../models/teamups.js'

export const createTeamup = async (req, res) => {
  try {
    const result = await teamups.create({
      organizer: req.user._id,
      date: req.body.selectedDate,
      time: req.body.selectedTime,
      hour: req.body.selectedHour,
      currentPeople: req.body.currentPeople,
      totalPeople: req.body.totalPeople,
      cardImage: req.files?.cardImage[0].path || '',
      type: req.body.type,
      interesting: req.body.interesting,
      title: req.body.title,
      content: req.body.content
    })
    res.status(200).json({ success: true, message: '預約成功', result })
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
