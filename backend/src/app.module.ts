import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './module/auth.module';
import { UserModule } from './module/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        console.log('config--------->>>', config);
        return ({
          dbName: config.get('database.mongoDbs'),
          entities: ['./.backend/entities/**/*.entity.js'],
          entitiesTs: ['./backend/entities/**/*.entity.ts'],
          type: 'mongo',
          clientUrl: config.get('database.mongoUrl'),
        })
      },
      inject: [ConfigService],
    }),
    CacheModule.register({ isGlobal: true, ttl: Number.MAX_SAFE_INTEGER }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
