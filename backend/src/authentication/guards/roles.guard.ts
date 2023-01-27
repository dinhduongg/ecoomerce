import { UserDTO } from '@/services/dto/user.dto'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user as UserDTO

        //console.log('roles--->>', roles,user.authorities.some((role) => roles.indexOf(role) >= 0))
        return user && user.authorities && user.authorities.some((role) => roles.indexOf(role) >= 0)
    }
}
