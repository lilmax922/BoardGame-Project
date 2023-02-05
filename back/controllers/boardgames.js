import boardgames from '../models/boardgames.js'

export const createBoardgame = async (req, res) => {
  try {
    await boardgames.create({
      introduction: req.body.introduction,
      name: req.body.name,
      images: req.body.images,
      types: req.body.types,
      players: req.body.players,
      playingTime: req.body.playingTime,
      age: req.body.age,
      ytVideo: req.body.ytVideo,
      components: req.body.components,
      setup: req.body.setup,
      playingTheGame: req.body.playingTheGame,
      endingTheGame: req.body.endingTheGame
    })
    res.status(200).json({ success: true, message: 'BoardGame 建立成功' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 代表重複
      console.log(error)
      res.status(400).json({ success: false, message: '桌遊名稱重複' })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
