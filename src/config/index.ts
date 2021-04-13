import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {

  port: Number.parseInt(process.env.PORT || '') || 8080,

  environment: process.env.ENVIRONMENT || 'production',

  logs: {
    level: process.env.LOG_LEVEL||'silly',
  },

  database: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_HOST || '',
    database: process.env.DB_DATABASE || '',
    port: Number.parseInt(process.env.DB_PORT || '') || 1433,
    pool: {
      min: 5
    }
  },

  cache:{
    port: process.env.CACHE_PORT||6379,
    host: process.env.CACHE_HOST || 'localhost'
  },

  dnaConfig:{
  //Cantidad mínima de secuencias para calificar como mutante
  minsequences:Number.parseInt(process.env.MINSEQUENCES||'')||2,
  //Longitud mínima de secuencia
  sequencelength:Number.parseInt(process.env.SEQUENCELENGTH||'')||4,
  //Caracteres de secuencia
  sequencechars:["A","T","G","C"]
  }

};

