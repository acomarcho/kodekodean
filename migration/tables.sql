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
  rank INT,
  course_id INT REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS course_unit_modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  description VARCHAR,
  rank INT,
  course_unit_id INT REFERENCES course_units(id)
);

CREATE TABLE IF NOT EXISTS course_unit_module_chunks (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  content_path VARCHAR,
  rank INT,
  unit_module_id INT REFERENCES course_unit_modules(id)
);