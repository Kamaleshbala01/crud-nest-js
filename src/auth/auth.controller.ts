import { Controller, Post, Req ,Res} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request,Response } from "express";
import { UserCredentialService } from "src/providers/userCredentials.service";
@Controller("auth")
export class AuthController {
    constructor(private readonly authService:AuthService,private readonly userCredentialService:UserCredentialService){}

    @Post("/login")
    async login(@Req() req:Request,@Res() res:Response){
        try {
            const {emailId,password} = req.body;
            const user = await this.authService.validateUser(emailId,password);
            if(!user) return res.status(404).json({message:"User not found"});
            const token = await this.authService.login(user);
            res.status(201).json({jwtToken:token});
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }

    @Post('/register')
    async register(@Req() req:Request, @Res() res:Response) {
        try {
            console.log(req.body);
            await this.userCredentialService.createUser(req.body);
            return res.status(201).json({message:"user created Sucessfully"});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    }
}