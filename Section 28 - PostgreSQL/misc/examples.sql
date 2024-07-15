-- https://www.postgresql.org/docs/current/datatype.html

CREATE TABLE capitals (
  id SERIAL PRIMARY KEY,
  country VARCHAR(45),
  capital VARCHAR(45)
);

SELECT * FROM public.capitals
ORDER BY id ASC 


CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  -- SERIAL auto-increments on new entry
  name VARCHAR(50),
  -- VARCHAR(limit) limits length to 50 and lessens in size to use efficient memory
  -- TEXT also works and it is not so much more inefficient
  age INT,
  is_cool BOOLEAN
);

-- select all countries with names which begin with capital u
SELECT country
FROM world_food 
WHERE country LIKE 'U' || '%'

-- in SQL || concatenates 2 strings

-- select all countries with names which begin end with a
SELECT country
FROM world_food 
WHERE country LIKE '%' || 'a'

-- PostgreSQL Constrains
NOT NULL  
-- can't add NULL anything else goes
UNIQUE
-- can't be repeated in its table's and column


INSERT INTO world_food (country, rice_production, wheat_production)
VALUES ('Italy', 1.46, 7.3)


CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  country_code CHAR(2),
  country_name VARCHAR(100)
);


-- update and delete data & tables

ALTER TABLE studen
  RENAME TO user;

ALTER TABLE user
  ALTER COLUMN first_name TYPE VARCHAR(20);

ALTER TABLE contact_detail
  ADD email TEXT;

-- defines that the combination of the values in columns a and c combined must be unique
-- even if they arent individually unique
CREATE TABLE example (
  a integer,
  b integer,
  c integer,
  UNIQUE (a, c)
);

-- a new rule on the table from the family travel tracker example
ALTER TABLE visited_countries
	ADD UNIQUE(country_code, user_id) 


UPDATE users SET name = 'Test' WHERE id = 1

SELECT * FROM users ORDER BY name DESC

DELETE FROM visited_countries WHERE country_code = 'AU' AND user_id = 1