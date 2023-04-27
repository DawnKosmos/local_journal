package db

import (
	"github.com/DawnKosmos/local_journal/backend/db/qq"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgtype"
	"time"
)

type MealsDashboard struct {
	LatestMeals []qq.LatestMealsRow      `json:"latest_meals"`
	LatestDays  []qq.GetMealsDailySumRow `json:"latest_days"`
}

func (p *Pgx) MealsDashboard(c *fiber.Ctx) error {
	res, err := p.q.LatestMeals(ctx, 1)
	if err != nil {
		return err
	}

	days, err := p.q.GetMealsDailySum(ctx, qq.GetMealsDailySumParams{
		UserID: 1,
		Unix:   pgtype.Timestamp{Time: time.Now(), Valid: true},
	})

	return c.JSON(MealsDashboard{
		LatestMeals: res,
		LatestDays:  days,
	})
}
