import { Address, User as IUser } from '@/entities/shared/account.interface';
import { AuthorityRole } from '@/entities/shared/enum';
import { Base } from '@/entities/support/base.entity';
export declare class User extends Base implements IUser {
    username: string;
    password: string;
    email: string;
    phone: string;
    fullname: string;
    authorities: AuthorityRole[];
    authority: AuthorityRole;
    refreshToken: string;
    addresses: Address[];
}
