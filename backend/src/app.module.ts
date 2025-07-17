import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, PrometheusModule.register({}), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
