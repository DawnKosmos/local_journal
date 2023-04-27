package main

import (
	"github.com/DawnKosmos/local_journal/backend/db"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"log"
)

var HOST = "127.0.0.1"
var DATABASE = "blog"
var PG_USER = "postgres"
var PASSWORD = "password"
var PORT = 5432

func main() {
	pg, err := db.New(HOST, DATABASE, PG_USER, PASSWORD, PORT)
	if err != nil {
		log.Fatalln(err)
	}

	ff, err := pg.ReadAllFoods()
	if err != nil {
		log.Fatalln(err)
	}
	if len(ff) == 0 {
		err = LoadFood(pg, "assets/food.txt")
		if err != nil {
			log.Fatalln(err)
		}
	}

	app := NewRouter(pg)
	app.Listen(":8080")
}

func NewRouter(pg *db.Pgx) *fiber.App {
	app := fiber.New(fiber.Config{})

	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "http://localhost:4200")
		c.Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		if c.Method() == "OPTIONS" {
			return c.SendStatus(fiber.StatusOK)
		}
		return c.Next()
	})
	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
	}))

	app.Get("/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})
	app.Get("/db", pg.HelloDB)

	//food
	//	app.Get("/food", nil) // return latest 7 Meals + Sum Of latest 7 Days
	//new_meal
	app.Get("/food", pg.GetFoods)
	app.Get("/food/:id", pg.GetFood)
	app.Post("/food/new", pg.NewFood)
	app.Post("/meal/new", pg.CreateMeal)
	//meal
	app.Get("/meal/:id", pg.GetMeal)
	app.Get("/meal", pg.MealsDashboard)
	//food_cost
	//app.Post("/food/:id") // add cost to a food
	//app.Get("/food/:id")

	return app
}
