import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createBoardgame, getPostBoardgames } from '../controllers/boardgames.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createBoardgame)
router.get('/', getPostBoardgames)

export default router
