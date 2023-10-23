import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import { getPeople } from '../controllers/personController.js';

const router = express.Router();

router.get('/', authenticateUser, getPeople);

export default router;
