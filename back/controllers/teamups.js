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
      // type: req.body.type,
      types: req.body.types,
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

export const getTeamup = async (req, res) => {
  try {
    const result = await teamups.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到此揪團' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getAllTeamups = async (req, res) => {
  try {
    const result = await teamups.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const joinOrCancelTeamup = async (req, res) => {
  try {
    const teamup = await teamups.findById(req.params.id)
    if (!teamup) {
      return res.status(404).json({ success: false, message: '找不到此揪團' })
    }
    if (!teamup.participant.includes(req.user._id)) {
      if (teamup.currentPeople >= teamup.totalPeople) {
        return res.status(400).json({ success: false, message: '揪團人數已滿' })
      }
      if (teamup.participant.includes(req.user._id)) {
        return res.status(400).json({ success: false, message: '您已經參加了該揪團' })
      }
      teamup.participant.push(req.user._id)
      teamup.currentPeople++
      await teamup.save()
      res.status(200).json({ success: true, message: '參加揪團成功', teamup })
    } else {
      teamup.participant.splice(teamup.participant.indexOf(req.user._id), 1)
      teamup.currentPeople--
      await teamup.save()
      res.status(200).json({ success: true, message: '取消參加成功', teamup })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
    // 代表重複
      res.status(400).json({ success: false, message: '名稱重複' })
    } else if (error.name === 'CastError') {
      res.status(400).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

// export const cancelTeamup = async (req, res) => {
//   try {
//     const teamup = await teamups.findById(req.params.id)
//     if (!teamup) {
//       return res.status(404).json({ success: false, message: '找不到此揪團' })
//     }
//     teamup.participant.splice(req.user._id, 1)
//     teamup.currentPeople--
//     await teamup.save()
//     res.status(200).json({ success: true, message: '取消參加成功', teamup })
//   } catch (error) {
//     console.log(error)
//     if (error.name === 'ValidationError') {
//       const key = Object.keys(error.errors)[0]
//       const message = error.errors[key].message
//       res.status(400).json({ success: false, message })
//     } else if (error.name === 'MongoServerError' && error.code === 11000) {
//     // 代表重複
//       res.status(400).json({ success: false, message: '名稱重複' })
//     } else if (error.name === 'CastError') {
//       res.status(400).json({ success: false, message: 'ID 格式錯誤' })
//     } else {
//       res.status(500).json({ success: false, message: '未知錯誤' })
//     }
//   }
// }

export const editTeamup = async (req, res) => {
  try {
    const result = await teamups.findByIdAndUpdate(req.params.id, {
      cardImage: req.files?.cardImage ? req.files?.cardImage[0].path : req.body.cardImage,
      currentPeople: req.body.currentPeople,
      totalPeople: req.body.totalPeople
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到此揪團' })
    } else {
      res.status(200).json({ success: true, message: '揪團編輯成功', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
    // 代表重複
      res.status(400).json({ success: false, message: '名稱重複' })
    } else if (error.name === 'CastError') {
      res.status(400).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const deleteTeamup = async (req, res) => {
  try {
    const result = teamups.findByIdAndUpdate(req.params.id, { new: true })
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
    } else if (error.name === 'CastError') {
      res.status(400).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
