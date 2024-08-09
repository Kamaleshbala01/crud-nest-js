import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userCredentialModule } from './modules/userCredentials.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConnection),userCredentialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
