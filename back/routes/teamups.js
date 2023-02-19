import { Router } from 'express'
import content from '../middleware/content.js'
import { jwt } from '../middleware/auth.js'
import * as upload from '../middleware/upload.js'
import admin from '../middleware/admin.js'
import { createTeamup, getAllTeamups, getTeamup, joinTeamup, editTeamup, deleteTeamup } from '../controllers/teamups.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, upload.boardgameImg, createTeamup)
router.post('/:id', content('application/json'), jwt, joinTeamup)
router.get('/all', jwt, getAllTeamups)
router.get('/:id', getTeamup)
router.patch('/delete/:id', content('application/json'), jwt, admin, deleteTeamup)
router.patch('/:id', content('multipart/form-data'), jwt, admin, editTeamup)

export default router
