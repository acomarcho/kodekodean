CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  email VARCHAR UNIQUE,
  password VARCHAR
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  description VARCHAR,
  course VARCHAR
);

CREATE TABLE IF NOT EXISTS course_units (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  course_id INT REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS course_unit_modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  description VARCHAR,
  rank VARCHAR,
  course_unit_id INT REFERENCES course_units(course_id)
);