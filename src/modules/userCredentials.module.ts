import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userCredentialController } from "src/controllers/userCredentials.controller";
import { UserCredentials } from "src/entities/user.entity";
import { UserCredentialService } from "src/providers/userCredentials.service";

@Module(
    {
        imports : [TypeOrmModule.forFeature([UserCredentials])],
        controllers:[userCredentialController],
        providers : [UserCredentialService]
    }
   
)

export class userCredentialModule{}