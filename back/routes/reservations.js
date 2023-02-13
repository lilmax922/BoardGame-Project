import { Router } from 'express'
import content from '../middleware/content.js'
import { jwt } from '../middleware/auth.js'
// import admin from '../middleware/admin.js'
import { createReservation, getReservation } from '../controllers/reservations.js'

const router = Router()

router.post('/getdate', content('application/json'), jwt, getReservation)
router.post('/', content('application/json'), jwt, createReservation)
// router.get('/all', jwt, getAllReservations)
// router.get('/adminAll', jwt, admin, getAdminAllReservations)
// router.get('/:id', jwt, getReservation)
// router.patch('/delete/:id', content('application/json'), jwt, deleteReservation)

export default router
