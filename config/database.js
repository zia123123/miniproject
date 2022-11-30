require('dotenv').config()

module.exports = {

 //Configuracion de DB
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_DATABASE ,
    host:     process.env.DB_HOST ,
    dialect: process.env.DB_DIALECT ,
    port: process.env.DB_PORT ,
 


  
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // host: process.env.DB_HOST,
  // dialect: process.env.DB_DIALECT || "postgres",


  // username: process.env.DB_USERNAME || "root",
  // password: process.env.DB_PASSWORD ||  "@Zia123123",
  // database: process.env.DB_DATABASE || "netta",
  // host: process.env.DB_HOST ||"153.92.5.226", 
  // dialect: process.env.DB_DIALECT || "mysql",
  	
  
  //host: process.env.DB_HOST ||"45.13.132.252",
  // Configurar Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // Configuracion de Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations"

}