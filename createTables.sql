CREATE TABLE movies (
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	description	TEXT,
	duration INTEGER NOT NULL,
	price INTEGER NOT NULL
);

SELECT * FROM movies;

INSERT INTO movies(name, description, duration, price)
VALUES
('Avengers', 'A avergers movie', 2, 5);

SELECT  
	*
FROM
	movies
WHERE
	id = $1;