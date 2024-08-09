import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy} from "passport-jwt"
import { UserCredentialService } from "src/providers/userCredentials.service";
import {JWT_SECRET} from './constants'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userCredentialService:UserCredentialService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : JWT_SECRET.secret
        });
    }

    async validate(payload:any){
        const user = await this.userCredentialService.findUserById(payload.sub);
        if(!user) throw new UnauthorizedException();
        return payload;
    }
}