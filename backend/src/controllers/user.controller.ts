import { Roles, RolesGuard } from '@/authentication'
import { TokenVerifyGuard } from '@/authentication/guards/token-verify.guard'
import { Address } from '@/entities/shared/account.interface'
import { AuthorityRole } from '@/entities/shared/enum'
import { UserDTO } from '@/services/dto/user.dto'
import { Body, Controller, Delete, Get, Param, Patch, UseGuards, Req } from '@nestjs/common'
import { UserService } from '../services/user.service'

@Controller('users')
@UseGuards(TokenVerifyGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles(AuthorityRole.ADMIN, AuthorityRole.MANAGER)
  findAll() {
    return this.userService.findAll()
  }

  @Get('info')
  findOne(@Req() req): Promise<UserDTO> {
    return this.userService.findOne(req.user.username)
  }

  @Patch('update')
  update(@Req() req, @Body() dto: Partial<UserDTO> & { address: Address }): Promise<UserDTO> {
    return this.userService.update(req.user.username, dto)
  }

  @Patch(':username/password/:action')
  @Roles(AuthorityRole.ADMIN, AuthorityRole.MANAGER)
  resetPassword(
    @Param('username') username: string,
    @Param('action') action: string,
    @Body() dto: UserDTO
  ): Promise<UserDTO> {
    return this.userService.resetPassword(username, action, dto)
  }

  @Delete('delete/:username')
  @Roles(AuthorityRole.ADMIN, AuthorityRole.MANAGER)
  remove(@Param('username') username: string) {
    return this.userService.remove(username)
  }
}
