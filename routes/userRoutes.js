import { Hono } from 'hono';
import userController from '../controllers/userController.js';

const userRoutes = new Hono();

userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.post('/', userController.createUser);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);
userRoutes.post('/:userId/friends/:friendId', userController.addFriend);
userRoutes.delete('/:userId/friends/:friendId', userController.removeFriend);

export default userRoutes;