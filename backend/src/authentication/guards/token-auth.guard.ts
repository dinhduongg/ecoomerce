import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'jsonwebtoken'

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private readonly config: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const accessToken = request.headers['authorization']?.split(' ')[1]

        if (!accessToken) {
            return true
        }

        verify(accessToken, this.config.get('security.authentication.jwt.access'), (err: any) => {
            if (err) {
                throw new HttpException('Token is not valid', HttpStatus.FORBIDDEN)
            }
        })

        return true
    }
}
