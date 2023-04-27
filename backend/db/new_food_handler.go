package db

import (
	"errors"
	"fmt"
	"github.com/DawnKosmos/local_journal/backend/db/qq"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgtype"
	"strconv"
	"time"
)

func (p *Pgx) GetFoods(c *fiber.Ctx) error {
	res, err := p.q.ReadFoods(ctx, 1)
	if err != nil {
		return err
	}
	return c.JSON(res)
}

func (p *Pgx) GetFood(c *fiber.Ctx) error {
	id, err := strconv.ParseInt(c.Params("id"), 10, 64)
	if err != nil {
		return err
	}

	res, err := p.q.ReadFood(ctx, int32(id))
	if err != nil {
		return err
	}
	return c.JSON(res)
}

type NewFood struct {
	Name          string  `json:"name"`
	Kcal          float64 `json:"kcal"`
	Protein       float64 `json:"protein"`
	Fat           float64 `json:"fat"`
	Carb          float64 `json:"carb"`
	DefaultAmount int32   `json:"default_amount"`
}

func (p *Pgx) NewFood(c *fiber.Ctx) error {
	var ff NewFood

	err := c.BodyParser(&ff)
	if err != nil {
		fmt.Println(err)
		return err
	}

	if ff.Name == "" || ff.Kcal <= 0 || ff.DefaultAmount <= 0 {
		return errors.New("Input Wrong")
	}

	res, err := p.q.CreateFood(ctx, qq.CreateFoodParams{
		UserID:        1,
		Name:          ff.Name,
		Kcal:          ff.Kcal,
		Carb:          ff.Carb,
		Fat:           ff.Fat,
		Protein:       ff.Protein,
		DefaultAmount: ff.DefaultAmount,
	})
	if err != nil {
		return err
	}
	return c.JSON(qq.ReadFoodsRow{FoodID: res, Name: ff.Name})
}

// NewMeal
type CreateMealRequest struct {
	Name    string     `json:"name,omitempty"`
	Foods   []MealFood `json:"foods,omitempty"`
	Kcal    float64    `json:"kcal,omitempty"`
	Amount  float64    `json:"amount,omitempty"`
	Protein float64    `json:"protein,omitempty"`
	Fat     float64    `json:"fat,omitempty"`
	Carb    float64    `json:"carb,omitempty"`
	Unix    string     `json:"unix,omitempty"`
}

type MealFood struct {
	FoodId int32 `json:"food_id,omitempty"`
	Amount int32 `json:"amount,omitempty"`
}

func (p *Pgx) CreateMeal(c *fiber.Ctx) error {
	var nm CreateMealRequest

	if err := c.BodyParser(&nm); err != nil {
		fmt.Println(err)
		return err
	}

	t, _ := time.Parse("2006-01-02T15:04", nm.Unix)

	mealId, err := p.q.CreateMeal(ctx, qq.CreateMealParams{
		UserID:  1,
		Name:    nm.Name,
		Kcal:    nm.Kcal,
		Carb:    nm.Carb,
		Fat:     nm.Fat,
		Amount:  nm.Amount,
		Protein: nm.Protein,
		Unix: pgtype.Timestamp{
			Time:  t,
			Valid: true,
		},
	})
	if err != nil {
		return err
	}

	for _, v := range nm.Foods {
		err := p.q.CreateMealFood(ctx, qq.CreateMealFoodParams{
			FoodID: v.FoodId,
			MealID: mealId,
			Amount: v.Amount,
		})
		if err != nil {
			fmt.Println(err)
		}
	}

	return c.JSON(mealId)
}
