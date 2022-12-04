import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule } from 'nestjs-i18n';
import { AuthModule } from './modules/auth/auth.module';

import {
  GlobalCustomExceptionFilter,
  GlobalCustomExceptionInterceptor,
  GlobalJwtAuthGuard,
  GlobalRolesGuard,
  I18nOptions,
} from './shared/config-constants/app.configuration';
import { ServerLogger } from './services/logger/server-logger';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { DecoratorsModule } from './shared/decorators/decorators.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetModule } from './modules/tweet/tweet.module';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { IDValidationPipe } from './shared/error-handling/validation-middleware';
import { LoggingInterceptor } from './shared/decorators/intercepter/LoggingIntercepter.interceptor';
// import { IDValidationPipe } from './shared/error-handling/validation-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ServicesModule,
    AuthModule,
    DecoratorsModule,
    I18nModule.forRoot(I18nOptions),
    PassportModule,
    TweetModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalCustomExceptionFilter,
    GlobalCustomExceptionInterceptor,
    ServerLogger,
    {
      provide: APP_PIPE,
      useClass: IDValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // GlobalRolesGuard,
    // GlobalJwtAuthGuard,
  ],
})
export class AppModule {}
