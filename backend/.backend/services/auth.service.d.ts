import { registerData } from '@/entities/shared/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from './user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        username: string;
        email?: string;
        phone?: string;
        fullname?: string;
        authorities: import("../entities/shared/enum").AuthorityRole[];
        authority: import("../entities/shared/enum").AuthorityRole;
        refreshToken?: string;
        addresses: import("../entities/shared/account.interface").Address[];
        createdBy: string;
        updatedBy: string;
    }>;
    login(user: any, res: any): Promise<{
        accessToken: string;
        username: any;
        authorities: any;
        fullname: any;
    }>;
    register(dto: registerData): Promise<void>;
    logout(request: Request, response: Response): Promise<void>;
}
