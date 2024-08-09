import { UserCredentials } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const dbConnection:PostgresConnectionOptions = {
    type:"postgres",
    host : "localhost",
    port : 5500,
    username : "postgres",
    password : "kamalesh@2005",
    database :"user-crud",
    entities : [UserCredentials],
    synchronize :true
}