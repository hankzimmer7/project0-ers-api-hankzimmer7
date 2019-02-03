import express from 'express';
import { User } from '../../models/user';
import * as UserDao from '../../dao/user.dao';
import { authMiddleware } from '../../middleware/auth.middleware';

export const userRouter = express.Router();

// /users - find all
userRouter.get('', [
  authMiddleware,
  async (req, res) => {
    try {
      const users = await UserDao.findAll();
      res.json(users);
    } catch (err) {
      res.sendStatus(500);
    }
  }]);

// /users/:id - find by id
userRouter.get('/:id', async (req, res) => {
  console.log(req.params);
  const idParam = +req.params.id;
  try {
    const user = await UserDao.findById(idParam);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// userRouter.post('', (req, res) => {
//   users.push(req.body);
//   res.sendStatus(201);
// });

