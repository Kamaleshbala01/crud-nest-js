import {Column,PrimaryGeneratedColumn,Entity} from 'typeorm'

@Entity('user-credentials')
export class UserCredentials {
    @PrimaryGeneratedColumn()
    id : Number

    @Column ({nullable :false})
    userName : string;

    @Column({nullable:false})
    emailId : string;

    @Column({nullable:false})
    password : string;
}