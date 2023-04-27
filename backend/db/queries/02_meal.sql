-- name: CreateMeal :one
INSERT INTO meals
    (user_id, name, kcal, carb, fat, protein, amount, unix)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING meal_id;


-- name: ReadMeals :many
SELECT *
FROM meals
WHERE user_id = $1
  and unix < $2
LIMIT 10;

-- name: ReadMeal :one
SELECT *
FROM meals
WHERE meal_id = $1;


-- name: DeleteMeal :exec
DELETE
from meals
WHERE meal_id = $1
  and user_id = $2;

-- name: GetMealsDailySum :many
SELECT date_trunc('day', unix) as day,
       sum(kcal)               as total_kcal,
       sum(carb)               as total_carb,
       sum(fat)                as total_fat,
       sum(protein)            as total_protein,
       sum(amount)             as total_amount
FROM meals
WHERE user_id = $1
  and unix < $2
GROUP BY day
LIMIT 7;


-- name: LatestMeals :many
SELECT meal_id,
       name,
       kcal,
       carb,
       fat,
       protein,
       amount,
       unix
FROM meals
WHERE user_id = $1
ORDER BY unix DESC
LIMIT 7;