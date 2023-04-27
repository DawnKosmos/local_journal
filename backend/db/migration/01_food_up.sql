CREATE TABLE IF NOT EXISTS users
(
    user_id SERIAL PRIMARY KEY,
    name    varchar(16) NOT NULL,
    unique (name)
);

CREATE TABLE IF NOT EXISTS meals
(
    meal_id SERIAL primary key,
    user_id bigint       NOT NULL,
    name    varchar(128) NOT NULL,
    kcal    float8       NOT NULL,
    carb    float8       not null,
    fat     float8       not null,
    protein float8       not null,
    amount  float        NOT NULL,
    unix    timestamp    NOT NULL
);

CREATE TABLE IF NOT EXISTS foods -- nutrition is always per 100g so 15 carbs means 15g in 100g
(
    food_id        SERIAL PRIMARY KEY,
    user_id        bigint references users (user_id) ON DELETE CASCADE NOT NULL,
    name           varchar(128) UNIQUE                                 NOT NULL,
    kcal           float8                                              NOT NULL,
    carb           float8                                              not null,
    fat            float8                                              not null,
    protein        float8                                              not null,
    default_amount int                                                 not null -- e.g. You can set the default Value for a schokolate bar
);


CREATE TABLE IF NOT EXISTS meal_food
(
    food_id int NOT NULL references foods (food_id) ON DELETE CASCADE,
    meal_id int NOT NULL references meals (meal_id) ON DELETE CASCADE,
    amount  int NOT NULL
);



CREATE TABLE IF NOT EXISTS food_price
(
    user_id  bigint references users (user_id) ON DELETE CASCADE,
    food_id  int NOT NULL references foods (food_id) ON DELETE CASCADE,
    price    int NOT NULL, --price in lowest currency
    currency int NOT NULL, -- in lowest nomination so 1 = 0.01€
    amount   int NOT NULL  -- amount in gram
);

INSERT INTO users(user_id, name)
VALUES (1, 'Dawn');


---- create above / drop below ----

DROP TABLE IF EXISTS food_price;
DROP TABLE IF EXISTS meal_food;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS meal;
DROP TABLE IF EXISTS users;