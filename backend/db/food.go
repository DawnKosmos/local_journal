package db

import "github.com/DawnKosmos/local_journal/backend/db/qq"

func (p *Pgx) InsertFood(UserId int64, name string, kcal, carb, fat, protein float64, defaultAmount int32) (int32, error) {
	return p.q.CreateFood(ctx, qq.CreateFoodParams{
		UserID:        UserId,
		Name:          name,
		Kcal:          kcal,
		Carb:          carb,
		Fat:           fat,
		Protein:       protein,
		DefaultAmount: defaultAmount,
	})
}

func (p *Pgx) ReadAllFoods() ([]qq.ReadFoodsRow, error) {
	return p.q.ReadFoods(ctx, 1)
}
