import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { LoginRequestBody, RegisterRequestBody } from '../types';

// In-memory user store (for simplicity)
const users: { id: string; email: string; password: string }[] = [];

const router: Router = express.Router();

router.post(
  '/login',
  async (req: Request<object, object, LoginRequestBody>, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = users.find((u) => u.email === email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });

      res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error(error); // ✅ log error to avoid unused warning
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post(
  '/register',
  async (req: Request<object, object, RegisterRequestBody>, res: Response) => {
    try {
      const { email, password } = req.body;

      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: uuidv4(), email, password: hashedPassword };
      users.push(user);

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });

      res.status(201).json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error(error); // ✅ log error
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
