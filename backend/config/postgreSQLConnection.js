const { Pool } = require('pg');

const dotenv = require('dotenv')

dotenv.config()


const con = new Pool({

  user: process.env.USER_DB,
  host:  process.env.HOST_DB,
  database: process.env.DB,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
  ssl: false

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
 * CREATE TABLE authorized_persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    person_id INT REFERENCES authorized_persons(id),
    image_data BYTEA
);

CREATE TABLE embeddings (
    embedding_id SERIAL PRIMARY KEY,
    image_id INT REFERENCES images(id),
    embedding_data BYTEA
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    person_id INT REFERENCES authorized_persons(id),
    hour VARCHAR(10),
    date VARCHAR(10)
);

CREATE TABLE intruders (
    id SERIAL PRIMARY KEY,
    person_id INT REFERENCES authorized_persons(id),
    hour VARCHAR(10),
    date VARCHAR(10),
    image BYTEA
);
*/