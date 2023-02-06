import boardgames from '../models/boardgames.js'

export const createBoardgame = async (req, res) => {
  try {
    const result = await boardgames.create({
      introduction: req.body.introduction,
      name: req.body.name,
      // 如果沒上傳圖片的話 req.file 會是 undefined，undefined 沒有 .path，所以要 ?.
      images: req.file?.path || '',
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
    res.status(200).json({ success: true, message: '桌遊建立成功', result })
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
