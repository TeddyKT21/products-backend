import express from 'express'
import { checkAdminOrSame, checkUserValid, deleteUser, login, signUp, updateUser } from '../controllers/users.js';

const usersRouter = express.Router();

usersRouter.post('/login', login);

usersRouter.post('/signup', signUp);

usersRouter.delete('/',checkAdminOrSame, deleteUser);

usersRouter.put('/',checkUserValid, updateUser);


export default usersRouter;