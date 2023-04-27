-- name: ReadFoods :many
SELECT food_id, name
FROM foods
WHERE user_id = $1
   or user_id = 1;

-- name: CreateFood :one
INSERT INTO foods(user_id, name, kcal, carb, fat, protein, default_amount)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING food_id;

-- name: ReadFood :one
SELECT *
FROM foods
WHERE food_id = $1;

-- name: DeleteFood :exec
DELETE
FROM foods
WHERE food_id = $1;

