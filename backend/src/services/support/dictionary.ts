import { AuthorityRole } from "@/entities/shared/enum"
import { User } from "@/entities/user.entity"
import { Builder } from "builder-pattern"

export const generalUserTemplate = Builder(User)
    .username('')
    .password('')
    .email('')
    .phone('')
    .fullname('')
    .authorities([AuthorityRole.USER, AuthorityRole.ANONYMOUS])
    .authority(AuthorityRole.USER)
    .addresses([])
    .refreshToken('')
    .createdAt(new Date())
    .updatedAt(new Date())
    .build()