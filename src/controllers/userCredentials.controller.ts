import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request,Response } from "express";
import { UserCredentialService } from "src/providers/userCredentials.service";

@Controller('user')
export class userCredentialController{
    constructor(private userCredintialService : UserCredentialService){}
    @Get('getUser/:id')
    async getUser(@Param('id') id:number,@Res() res:Response){
        try {
            const user = await this.userCredintialService.findUserById(id);
            if(!user) return res.status(404).json({message:"user not found",user:{}});
            return res.status(200).json({userDetail:{
                username : user.username,
                emailId : user.emailId
            }});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id:number,@Res() res:Response){
        try {
            const response = await this.userCredintialService.deleteUserById(id);
            if(response.affected===0) return res.status(404).json({message:"user not found",response});
            return res.status(200).json({message:"user Deleted sucessfully..!",response});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Put("updateUser/:id")
    async updateUser(@Param('id') id:number,@Req() req:Request,@Res() res:Response){
        try {
            const newData = req.body;
            const response = await this.userCredintialService.updateUserById(id,newData);
            if(response.affected===0) return res.status(404).json({message:"user not found",response});
            res.status(200).json({message:"user updated..!",response});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    }
}