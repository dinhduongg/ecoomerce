import { Strategy } from 'passport-jwt';
import { UserDTO } from '@/services/dto/user.dto';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly config;
    constructor(config: ConfigService);
    validate(payload: UserDTO): Promise<UserDTO>;
}
export {};
