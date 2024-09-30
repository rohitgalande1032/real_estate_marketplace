import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { CreateListing, deleteListing} from '../controllers/listing.controller.js'

const router = express.Router()

router.post('/create', verifyToken, CreateListing)
router.delete('/delete/:id', verifyToken, deleteListing)

export default router