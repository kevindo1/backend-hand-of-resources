-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS nba;

CREATE TABLE nba (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  coach TEXT NOT NULL
);

DROP TABLE IF EXISTS food;

CREATE TABLE food (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  calories TEXT NOT NULL
);

DROP TABLE IF EXISTS anime;

CREATE TABLE anime (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  character TEXT NOT NULL
);

DROP TABLE IF EXISTS drinks;

CREATE TABLE drinks (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  color TEXT NOT NULL
);