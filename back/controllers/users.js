import users from '../models/users.js'
import teamups from '../models/teamups.js'

export const register = async (req, res) => {
  try {
    await users.create({
      nickname: req.body.nickname,
      phone: req.body.phone,
      password: req.body.password,
      email: req.body.email
    })
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 代表重複
      const key = Object.keys(error.keyPattern)[0]
      console.log(key)
      switch (key) {
        case 'nickname':
          return res.status(400).json({ success: false, message: '暱稱已被註冊' })
        case 'phone':
          return res.status(400).json({ success: false, message: '手機號碼已被註冊' })
        case 'email':
          return res.status(400).json({ success: false, message: '電子信箱已被註冊' })
      }
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const teamup = async (req, res) => {
  try {
    await teamups.create({
      organizer: req.body.organizer,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalPerson: req.body.totalPerson,
      type: req.body.type,
      interesting: req.body.interesting,
      title: req.body.title,
      content: req.body.content
    })
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
