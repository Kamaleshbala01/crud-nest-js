import {Column,PrimaryGeneratedColumn,Entity} from 'typeorm'

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
}