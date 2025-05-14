import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"irisa",
    database:"eucl",

    
});
    


db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
})
export default db;