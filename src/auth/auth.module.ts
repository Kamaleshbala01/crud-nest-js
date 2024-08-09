import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { userCredentialModule } from "src/modules/userCredentials.module";
import {JWT_SECRET} from './constants'

@Module({
    imports:[userCredentialModule,PassportModule,JwtModule.register({
        secret:JWT_SECRET.secret,
        signOptions : {expiresIn:'1h'}
    })],
    providers:[AuthService,JwtStrategy],
    controllers:[AuthController]
})

export class AuthMolule{}