import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {UserCredentials} from '../entities/user.entity'
import { Repository } from "typeorm";

export interface UserCredentialInterface{
    id:number,
    username : string,
    emailId : string,
    password : string
}

@Injectable()
export class UserCredentialService{
    constructor(@InjectRepository(UserCredentials) private UserCredentialsRepo : Repository<UserCredentialInterface>){}


createUser(user:UserCredentialInterface): Promise<UserCredentialInterface>{
    return this.UserCredentialsRepo.save(this.UserCredentialsRepo.create(user));
}

findUserById(id:number):Promise<UserCredentialInterface>{
    return this.UserCredentialsRepo.findOne({where:{id:id}});
}
}