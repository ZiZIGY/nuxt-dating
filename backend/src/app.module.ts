import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { InterestsModule } from './interests/interests.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    PrometheusModule.register({}),
    UsersModule,
    InterestsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
