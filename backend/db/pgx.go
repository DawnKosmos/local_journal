package db

import (
	"context"
	"fmt"
	"github.com/DawnKosmos/local_journal/backend/db/qq"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Pgx struct {
	db *pgxpool.Pool
	q  *qq.Queries
}

var ctx = context.Background()

func New(host, dbName, user, password string, port int) (*Pgx, error) {
	params := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbName)
	conn, err := pgxpool.New(context.Background(), params)
	if err != nil {
		return nil, err
	}

	return &Pgx{db: conn, q: qq.New(conn)}, nil
}

func (p *Pgx) HelloDB(c *fiber.Ctx) error {
	return c.SendString("Hello DB")
}
