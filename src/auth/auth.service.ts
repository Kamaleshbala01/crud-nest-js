import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserCredentialService } from "../providers/userCredentials.service";
import * as bcrypt from "bcrypt"
import { UserCredentials } from "src/entities/user.entity";

@Injectable()
export class AuthService{
    constructor(private userCredentialService:UserCredentialService,private jwtService:JwtService){}

    async validateUser(email:string,password:string):Promise<any>{
        const user = await this.userCredentialService.findUserByEmail(email);
        if(!user){
            return null;
        }
        const isMatch = bcrypt.compareSync(password,user.password);
        if(!isMatch) return null;
        return user;
    }

    async login(user:UserCredentials):Promise<any>{
        const payload = {userId:user.id,emailId:user.emailId};
        return this.jwtService.sign(payload);
    }
}