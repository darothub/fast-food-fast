DROP DATABASE IF EXISTS fast_food_fast;
CREATE DATABASE fast_food_fast;
\c fast_food_fast
CREATE TABLE users(
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL 
);
INSERT INTO users VALUES 
    ('darot', 'darotudeen@gmail.com'),
    ('amoke', 'amoke@gmail.com');

CREATE TABLE hot100(
    rant int,
    title text
);
INSERT INTO hot100 VALUES 
    (1, 'Aye'),
    (2, 'OkoOloyun');