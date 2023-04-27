-- name: CreateMealFood :exec
INSERT INTO meal_food
    (food_id, meal_id, amount)
VALUES ($1, $2, $3);

-- name: ReadFoodsFromMeal :many
SELECT foods.food_id, foods.name, foods.kcal, foods.carb,foods.fat,foods.protein, meal_food.amount
FROM meal_food
         JOIN foods ON meal_food.food_id = foods.food_id
WHERE meal_food.meal_id = $1;

-- name: DeleteMealFood :exec
DELETE
FROM meal_food
WHERE food_id = $1
  and meal_id = $2;

-- name: UpdateMealFood :exec
UPDATE meal_food
SET amount = $1
WHERE food_id = $2
  and meal_id = $3;
