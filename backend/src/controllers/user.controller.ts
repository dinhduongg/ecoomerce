import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserDTO } from '@/services/dto/user.dto';
import { JwtAuthGuard, Roles, RolesGuard } from '@/authentication';
import { AuthorityRole } from '@/entities/shared/enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles(AuthorityRole.ADMIN, AuthorityRole.MANAGER)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string): Promise<UserDTO> {
        return this.userService.findOne(username);
    }

    @Patch('update/:username')
    update(@Param('username') username: string, @Body() dto: UserDTO): Promise<UserDTO> {
        return this.userService.update(username, dto);
    }

    @Patch(':username/password/:action')
    resetPassword(@Param('username') username: string, @Param('action') action: string, @Body() dto: UserDTO): Promise<UserDTO> {
        return this.userService.resetPassword(username, action, dto);
    }

    @Delete('delete/:username')
    @Roles(AuthorityRole.ADMIN, AuthorityRole.MANAGER)
    remove(@Param('username') username: string) {
        return this.userService.remove(username);
    }
}
