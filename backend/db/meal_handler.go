package db

import (
	"fmt"
	"github.com/DawnKosmos/local_journal/backend/db/qq"
	"github.com/gofiber/fiber/v2"
	"strconv"
	"time"
)

type GetMealResponse struct {
	Name    string                    `json:"name"`
	Time    time.Time                 `json:"time"`
	Amount  float64                   `json:"amount"`
	Carb    float64                   `json:"carb"`
	Kcal    float64                   `json:"kcal"`
	Protein float64                   `json:"protein"`
	Fat     float64                   `json:"fat"`
	Foods   []qq.ReadFoodsFromMealRow `json:"foods"`
}

func (p *Pgx) GetMeal(c *fiber.Ctx) error {
	id, err := strconv.ParseInt(c.Params("id"), 10, 64)
	if err != nil {
		fmt.Println(err)
		return err
	}

	meal, err := p.q.ReadMeal(ctx, int32(id))
	if err != nil {
		fmt.Println(err)
		return err
	}

	foods, err := p.q.ReadFoodsFromMeal(ctx, int32(id))

	return c.JSON(GetMealResponse{
		Name:    meal.Name,
		Time:    meal.Unix.Time,
		Amount:  meal.Amount,
		Kcal:    meal.Kcal,
		Carb:    meal.Carb,
		Protein: meal.Protein,
		Fat:     meal.Fat,
		Foods:   foods,
	})
}
