package main

import (
	"encoding/json"
	"fmt"
	"github.com/DawnKosmos/local_journal/backend/db"
	"os"
)

type Food struct {
	ID      int32   `json:"id"`
	Name    string  `json:"name"`
	Kcal    float64 `json:"kcal"`
	Protein float64 `json:"protein"`
	Fat     float64 `json:"fat"`
	Carb    float64 `json:"carb"`
}

func LoadFood(db *db.Pgx, fileName string) error {
	f, err := os.ReadFile(fileName)

	fmt.Println(string(f))
	var ff []Food

	err = json.Unmarshal(f, &ff)
	if err != nil {
		fmt.Println(len(ff))
		return err
	}
	var count int
	for _, v := range ff {
		id, err := db.InsertFood(1, v.Name, v.Kcal, v.Carb, v.Fat, v.Protein, 100)
		if err != nil {
			fmt.Println(id, err)
		}
		count++
	}

	fmt.Printf("Succesfully Added %d new Foods", count)
	return nil
}
