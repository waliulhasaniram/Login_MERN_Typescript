import express from 'express';
const router = express.Router();
import authController from '../controller/user.controller';
import verifyToken from '../middleware/middleware';

router.post('/signup', authController.signUp_Controller);
router.post('/signin', authController.signIn_Controller);
router.get('/user', verifyToken,  authController.getUserData);
router.post('/logout', verifyToken, authController.loggout_Controller);
router.put('/update/:id', verifyToken, authController.userData_update);
router.put('/update-password/:id', verifyToken, authController.updatePassword_Controller);

export default router;