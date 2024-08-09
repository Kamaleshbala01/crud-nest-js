import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userCredentialModule } from './modules/userCredentials.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './config/database.config';
import { AuthMolule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConnection),
    userCredentialModule,AuthMolule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
