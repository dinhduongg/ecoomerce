import { User } from '@/entities/user.entity';
import { UserMapper } from '@/services/mappers/user.mapper';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserMapper],
    exports: [UserService]
})
export class UserModule { }
