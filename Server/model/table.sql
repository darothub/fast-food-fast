DROP DATABASE IF EXISTS fast_food_fast;

CREATE DATABASE fast_food_fast;
\c fast_food_fast;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    pass VARCHAR NOT NULL,
    roles VARCHAR NULL,
    created_At timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_At timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--INSERT INTO users VALUES ('darot', 'darotudeen@gmail.com', 'okbakassi'),('amoke', 'amoke@gmail.com', 'alonge');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    destination VARCHAR NOT NULL,
    dish VARCHAR NOT NULL,
    quantity VARCHAR NULL,
    price INTEGER NOT NULL,
    email VARCHAR NOT NULL,
    userId INTEGER REFERENCES users(id) ON UPDATE CASCADE,
    created_At timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_At timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--INSERT INTO orders VALUES('darot', 'Lagos', 'Amala', '2', '3500');

CREATE TABLE menu(
    id SERIAL PRIMARY KEY,
    food VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    food_image VARCHAR NOT NULL,
    userId INT REFERENCES users(id) ON DELETE CASCADE,
    created_At timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_At timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);