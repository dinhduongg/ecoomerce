import { registerData } from '@/entities/shared/auth.interface';
import { EntityManager } from '@mikro-orm/mongodb';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private config;
    private em;
    constructor(userService: UserService, jwtService: JwtService, config: ConfigService, em: EntityManager);
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
    }>;
    register(dto: registerData): Promise<void>;
    logout(request: Request, response: Response): Promise<void>;
    generateAccessToken(dto: UserDTO): Promise<string>;
    generateRefreshToken(dto: UserDTO): Promise<string>;
}
