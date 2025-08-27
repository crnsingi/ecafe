import { Request} from 'express';

export interface User { 
    id: string;
    email: string;
    password: string;
}

export interface AuthRequest extends Request { 
    user?: { userId: string };
}

export interface LoginRequestBody { 
    email: string;
    password: string;
}

export interface RegisterRequestBody { 
    email: string;
    password: string;
}