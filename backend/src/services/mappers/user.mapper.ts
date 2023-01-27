import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { hashSync } from 'bcrypt';
import { Builder } from "builder-pattern";
import { UserDTO } from "../dto/user.dto";

@Injectable()
export class UserMapper {
    toDTO(source: User): UserDTO {
        return Builder(UserDTO)
            .username(source.username)
            .password(source.password)
            .email(source.email)
            .phone(source.phone)
            .fullname(source.fullname)
            .authorities(source.authorities)
            .authority(source.authority)
            .refreshToken(source.refreshToken)
            .addresses(source.addresses)
            .createdAt(source.createdAt)
            .updatedAt(source.updatedAt)
            // .createdBy(source.createdBy)
            // .updatedBy(source.updatedBy)
            .build()
    }

    toEntity(source: Partial<UserDTO>): User {
        return Builder(User)
            .username(source.username)
            .password(source.password)
            .email(source.email)
            .phone(source.phone)
            .fullname(source.fullname)
            .authorities(source.authorities)
            .authority(source.authority)
            .refreshToken(source.refreshToken)
            .addresses(source.addresses)
            .createdAt(source.createdAt)
            .updatedAt(source.updatedAt)
            // .createdBy(source.createdBy)
            // .updatedBy(source.updatedBy)
            .build()
    }
}

const userMapper = {
    d2e: (d: UserDTO) => {
        const _ = Builder(User)
            .username(d.username)
            .password(hashSync(d.password, 10))
            .email(d.email)
            .phone(d.phone)
            .fullname(d.fullname)
            .authorities(d.authorities)
            .authority(d.authority)
            .refreshToken(d.refreshToken)
            .addresses(d.addresses)
            .createdAt(d.createdAt)
            .updatedAt(d.updatedAt)
            .build()

        return _
    },

    e2d(source: User) {
        return Builder(UserDTO)
            .username(source.username)
            // .password(hashSync(source.password))
            .email(source.email)
            .phone(source.phone)
            .fullname(source.fullname)
            .authorities(source.authorities)
            .authority(source.authority)
            .refreshToken(source.refreshToken)
            .addresses(source.addresses)
            .createdAt(source.createdAt)
            .updatedAt(source.updatedAt)
            .build()
    }
}

export default userMapper