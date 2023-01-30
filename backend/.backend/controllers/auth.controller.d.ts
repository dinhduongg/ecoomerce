import { registerData } from '@/entities/shared/auth.interface';
import { AuthService } from '@/services/auth.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<{
        accessToken: string;
    }>;
    register(dto: registerData): Promise<void>;
    logout(request: Request, response: Response): Promise<void>;
}
