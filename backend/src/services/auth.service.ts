import { registerData } from '@/entities/shared/auth.interface';
import { User } from '@/entities/user.entity';
import { EntityManager } from '@mikro-orm/mongodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private config: ConfigService,
        private em: EntityManager
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username)
        const match = await compare(password, user.password)

        if (!match) throw new HttpException({ error: { password: "Mật khẩu không chính xác" } }, HttpStatus.UNPROCESSABLE_ENTITY)

        if (user && match) {
            const { password, createdAt, updatedAt, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any, res: any) {
        try {
            const payload = {
                username: user.username,
                authorities: user.authorities,
                authority: user.authority
            } as UserDTO

            const currentUser = await this.em.findOne(User, { username: user.username })
            const accessToken = await this.generateAccessToken(payload)

            if (currentUser.refreshToken) {
                res.cookie('jwt', { refreshToken: currentUser.refreshToken }, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
            } else {
                const refreshToken = await this.generateRefreshToken(payload)
                currentUser.refreshToken = refreshToken

                res.cookie('jwt', { refreshToken: refreshToken }, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })

                await this.em.persistAndFlush(currentUser)
            }

            return { accessToken }
        } catch (error) {
            throw error
        }
    }

    async register(dto: registerData) {
        await this.userService.create(dto)
    }

    async logout(request: Request, response: Response) {
        try {
            const { jwt } = request.cookies
            if (!jwt) throw new HttpException('no token', HttpStatus.NO_CONTENT)

            response.clearCookie("jwt", {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })

            throw new HttpException('Đăng xuất', HttpStatus.NO_CONTENT)
        } catch (error) {
            throw error
        }
    }

    async generateAccessToken(dto: UserDTO) {
        try {
            const accessToken = await this.jwtService.signAsync(
                dto,
                {
                    secret: this.config.get<string>('security.authentication.jwt.access'),
                    expiresIn: '15s',
                }
            )

            return accessToken
        } catch (error) {
            throw error
        }
    }

    async generateRefreshToken(dto: UserDTO) {
        try {
            const refreshToken = await this.jwtService.signAsync(
                dto,
                {
                    secret: this.config.get<string>('security.authentication.jwt.refresh'),
                    expiresIn: '7d',
                }
            )

            return refreshToken
        } catch (error) {
            throw error
        }
    }
}
