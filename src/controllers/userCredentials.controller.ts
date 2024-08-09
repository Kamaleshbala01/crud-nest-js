import { Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { Request,Response } from "express";
import { UserCredentialService } from "src/providers/userCredentials.service";

@Controller('user')
export class userCredentialController{
    constructor(private userCredintialService : UserCredentialService){}

    @Post("/addUser")
    async addUser(@Req() req:Request,@Res() res:Response){
        try {
            console.log(req.body);
            const data = await this.userCredintialService.createUser(req.body);
            return res.status(201).json({message:"user created Sucessfully",data});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    }
}