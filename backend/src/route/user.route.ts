import express from 'express';
const router = express.Router();
import {signUp_Controller} from '../controller/user.controller';

router.post('/signup', signUp_Controller);

export default router;