import express from 'express';
const router = express.Router();
import {signIn_Controller, signUp_Controller, getUserData, loggout_Controller, userData_update, updatePassword_Controller} from '../controller/user.controller';
import verifyToken from '../middleware/middleware';

router.post('/signup', signUp_Controller);
router.post('/signin', signIn_Controller);
router.get('/user', verifyToken,  getUserData);
router.post('/logout', verifyToken, loggout_Controller);
router.put('/update/:id', verifyToken, userData_update);
router.put('/update_password/:id', verifyToken, updatePassword_Controller);

export default router;