import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your-secret-key'; // Use environment variable in production
const DATA_FILE = path.join(__dirname, 'users.json');

// Define user interface
interface User {
  id: number;
  phone: string;
  password: string;
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize users file
async function initializeUsersFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

// Read users from file
async function readUsers(): Promise<User[]> {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data) as User[];
}

// Write users to file
async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

// Middleware to verify JWT
interface AuthRequest extends Request {
  user?: { id: number; phone: string };
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }
    req.user = user as { id: number; phone: string };
    next();
  });
};

// Register endpoint
app.post('/api/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password } = req.body as { phone: string; password: string };

    if (!phone || !password) {
      res.status(400).json({ message: 'Phone number and password are required' });
      return;
    }

    const users = await readUsers();
    if (users.find(user => user.phone === phone)) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: users.length + 1,
      phone,
      password: hashedPassword,
    };

    users.push(newUser);
    await writeUsers(users);

    const token = jwt.sign({ id: newUser.id, phone: newUser.phone }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password } = req.body as { phone: string; password: string };

    if (!phone || !password) {
      res.status(400).json({ message: 'Phone number and password are required' });
      return;
    }

    const users = await readUsers();
    const user = users.find(u => u.phone === phone);

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id, phone: user.phone }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req: AuthRequest, res: Response): void => {
  res.json({ message: 'Protected content accessed successfully', user: req.user });
});

// Start server
async function startServer(): Promise<void> {
  try {
    await initializeUsersFile();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();