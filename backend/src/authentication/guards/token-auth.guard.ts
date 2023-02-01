import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const accessToken = request.headers['authorization']?.split(' ')[1]

        if (!accessToken) {
            return true
        }

        try {
            this.jwtService.verify(accessToken, { secret: this.config.get('security.authentication.jwt.access') })
            return true
        } catch (error) {
            throw new HttpException('access token hết hạn', HttpStatus.FORBIDDEN)
        }

        // verify(accessToken, this.config.get('security.authentication.jwt.access'), (err: any) => {
        //     if (err) {
        //         throw new HttpException('access token hết hạn', HttpStatus.FORBIDDEN)
        //     }
        // })

        // return true
    }
}
