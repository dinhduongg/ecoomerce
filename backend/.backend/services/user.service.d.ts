import { User } from '@/entities/user.entity';
import { UserDTO } from '@/services/dto/user.dto';
import { UserMapper } from '@/services/mappers/user.mapper';
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb';
import { Cache } from 'cache-manager';
import { registerData } from '@/entities/shared/auth.interface';
export declare class UserService {
    protected readonly repository: MongoEntityRepository<User>;
    protected readonly em: EntityManager;
    protected readonly mapper: UserMapper;
    protected readonly _cache: Cache;
    constructor(repository: MongoEntityRepository<User>, em: EntityManager, mapper: UserMapper, _cache: Cache);
    findAll(): Promise<UserDTO[]>;
    findOne(username: string): Promise<UserDTO>;
    create(dto: registerData): Promise<UserDTO | any>;
    update(username: string, dto: UserDTO): Promise<UserDTO>;
    resetPassword(username: string, action: string, dto: Pick<UserDTO, 'password'>): Promise<UserDTO>;
    remove(username: string): Promise<number>;
}
