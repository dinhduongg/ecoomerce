import { AccessTokenStrategy } from '@/authentication/accessToken.strategy';
import { JwtStrategy } from '@/authentication/jwt.strategy';
import { LocalStrategy } from '@/authentication/local.strategy';
import { RefreshTokenStrategy } from '@/authentication/refreshToken.strategy';
import { AuthController } from '@/controllers/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';

@Module({
    imports: [
        UserModule,
        PassportModule,
        // JwtModule.registerAsync({
        //     useFactory: async (config: ConfigService) => ({
        //         secret: config.get('security.authentication.jwt.secret'),
        //         signOptions: { expiresIn: '1d' }
        //     }),
        //     inject: [ConfigService]
        // })
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService]
})
export class AuthModule { }
