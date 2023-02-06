import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createBoardgame, editBoardgame, getAllBoardgames, getBoardgame, getPostBoardgames } from '../controllers/boardgames.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload.boardgame, createBoardgame)
router.get('/', getPostBoardgames)
router.get('/all', jwt, admin, getAllBoardgames)
router.get('/:id', getBoardgame)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload.boardgame, editBoardgame)

export default router
