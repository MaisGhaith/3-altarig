CREATE TABLE users(
user_id uuid PRIMARY KEY DEFAULT
uuid_generate_v4(),
user_name VARCHAR (255) NOT NULL,
user_email VARCHAR (255) NOT NULL,
user_password VARCHAR(255) NOT NULL
);


CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image BYTEA[] NOT NULL
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(20),
    notes TEXT,
    image TEXT,
    service_name VARCHAR(255),
    service_time TEXT,
    car_rent TEXT,
    location VARCHAR(255),
    service_id INTEGER,
    choice_id INTEGER,
    user_id INTEGER
);
