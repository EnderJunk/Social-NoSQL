import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
import User from '../../models/User.js';
import Thought from '../../models/Thought.js';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export { User, Thought };
export default router;