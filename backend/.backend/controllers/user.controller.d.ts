import { UserService } from '../services/user.service';
import { UserDTO } from '@/services/dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<UserDTO[]>;
    findOne(username: string): Promise<UserDTO>;
    update(username: string, dto: UserDTO): Promise<UserDTO>;
    resetPassword(username: string, action: string, dto: UserDTO): Promise<UserDTO>;
    remove(username: string): Promise<number>;
}
