import {Column,PrimaryGeneratedColumn,Entity, BeforeInsert, BeforeUpdate} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('UserCredentials')
export class UserCredentials {
    @PrimaryGeneratedColumn()
    id : Number

    @Column ({nullable :false})
    username : string;

    @Column({nullable:false,unique:true})
    emailId : string;

    @Column({nullable:false})
    password : string;

    @BeforeInsert()
    async encryptPassword(){
        try {
            if(this.password){
                const salt = await bcrypt.genSalt(10);
                this.password =  await bcrypt.hash(this.password,salt);
            } 
        } catch (error) {
            throw error;
        }
    }
}