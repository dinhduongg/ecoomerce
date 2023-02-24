import { AuthService } from '@/services/auth.service'
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class TokenVerifyGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const token = request.headers['authorization'] as string

        if (!token) {
            throw new HttpException('Accesstoken required', HttpStatus.UNAUTHORIZED)
        }

        // validate is token expired
        const check = await this.authService.verifyToken(token.split(' ')[1])

        return check
    }
}
