import { registerData } from '@/entities/shared/auth.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
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

    async login(user, res) {
        try {
            const accessToken = this.jwtService.sign(user)

            res.cookie('jwt', { accessToken, username: user.username, fullname: user.fullname, roles: user.authorities }, {
                httpOnly: false,
                secure: true,
                path: "/",
                sameSite: "none",
            })

            return { accessToken, username: user.username, authorities: user.authorities, fullname: user.fullname };
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
                httpOnly: false,
                secure: true,
                path: "/",
                sameSite: "none",
            })
            throw new HttpException('Đăng xuất', HttpStatus.NO_CONTENT)
        } catch (error) {
            throw error
        }
    }
}
