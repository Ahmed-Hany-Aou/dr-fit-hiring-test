package main

import (
	"log"

	"dr-fit-hiring-test/backend/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	if err := handlers.LoadRecipes("data/recipes.json"); err != nil {
		log.Fatalf("failed to load recipes: %v", err)
	}

	app := fiber.New()
	app.Use(cors.New())

	app.Get("/recipes", handlers.ListRecipes)
	app.Get("/recipes/:id", handlers.GetRecipe)

	log.Println("Server starting on :8080")
	log.Fatal(app.Listen(":8080"))
}
