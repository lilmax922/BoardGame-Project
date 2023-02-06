import boardgames from '../models/boardgames.js'

export const createBoardgame = async (req, res) => {
  try {
    console.log(req.files)
    const components = req.body.componentsText.map((comp, i) => {
      return {
        image: req.files.components[i].path,
        text: comp
      }
    })
    const result = await boardgames.create({
      post: req.body.post,
      introduction: req.body.introduction,
      name: req.body.name,
      // 如果沒上傳圖片的話 req.file 會是 undefined，undefined 沒有 .path，所以要 ?.
      images: req.files.images.map(file => file.path),
      types: req.body.types,
      players: req.body.players,
      gameTime: req.body.gameTime,
      age: req.body.age,
      ytVideo: req.body.ytVideo,
      components,
      setup: req.body.setup,
      gameFlow: req.body.gameFlow,
      endGame: req.body.endGame
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

export const getBoardgame = async (req, res) => {
  try {
    // req.params.id => 路由的 id 參數
    const result = await boardgames.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
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

export const getAllBoardgames = async (req, res) => {
  try {
    const result = await boardgames.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getPostBoardgames = async (req, res) => {
  try {
    const result = await boardgames.find({ post: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editBoardgame = async (req, res) => {
  try {
    const result = await boardgames.findByIdAndUpdate(req.params.id, {
      post: req.body.post,
      introduction: req.body.introduction,
      name: req.body.name,
      images: req.files.map(file => file.path),
      types: req.body.types,
      players: req.body.players,
      gameTime: req.body.gameTime,
      age: req.body.age,
      ytVideo: req.body.ytVideo,
      components: req.body.components,
      setup: req.body.setup,
      gameFlow: req.body.gameFlow,
      endGame: req.body.endGame
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '桌遊建立成功', result })
    }
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
    } else if (error.name === 'CastError') {
      res.status(400).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
