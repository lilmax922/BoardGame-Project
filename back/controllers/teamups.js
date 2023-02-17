import teamups from '../models/teamups'

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

  }
}
