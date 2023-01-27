import { User } from "@/entities/user.entity";
import { UserDTO } from "../dto/user.dto";
export declare class UserMapper {
    toDTO(source: User): UserDTO;
    toEntity(source: Partial<UserDTO>): User;
}
declare const userMapper: {
    d2e: (d: UserDTO) => User;
    e2d(source: User): UserDTO;
};
export default userMapper;
