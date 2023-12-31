const { Pool } = require('pg');

const dotenv = require('dotenv')

dotenv.config()


const con = new Pool({

  user: process.env.USER_DB,
  host:  process.env.HOST_DB,
  database: process.env.DB,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_clDB,

});

con.connect((err) => {

  if (err) {

    console.error('Error connecting to PostgreSQL:', err);

  } else {

    console.log('Connected to PostgreSQL database.');
    
  }
});

module.exports = con

/** 
 * 
 * 
 * 
 * 
 * 

CREATE 

CREATE TABLE authorized_persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
  );

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    person_id INT REFERENCES authorized_persons(id) ON DELETE CASCADE,
    image_data BYTEA
);

CREATE TABLE embeddings (
    embedding_id SERIAL PRIMARY KEY,
    image_id INT REFERENCES images(id) ON DELETE CASCADE,
    embedding_data TEXT
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    person_name VARCHAR(255),
    hour VARCHAR(10),
    date VARCHAR(10)
);

CREATE TABLE intruders (
    id SERIAL PRIMARY KEY,
    hour VARCHAR(10),
    date VARCHAR(10),
    image BYTEA
);
*/