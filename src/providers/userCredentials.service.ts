import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {UserCredentials} from '../entities/user.entity'
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'

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

    deleteUserById(id:number):Promise<any>{
       return this.UserCredentialsRepo.createQueryBuilder()
      .delete()
      .where(`id=:id`,{id})
      .execute();
    }

    async updateUserById(id:number,data:Partial<UserCredentials>){
        if(data.password){
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password,salt);
        }
       return this.UserCredentialsRepo.createQueryBuilder()
       .update()
       .set(data as object)
       .where('id=:id',{id})
       .execute()
    }

    findUserByEmail(email:string):Promise<UserCredentialInterface>{
        return this.UserCredentialsRepo.findOne({where:{emailId:email}});
    }
}