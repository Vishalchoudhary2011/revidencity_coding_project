package main

import (
	"golangRestApi/db"
	"golangRestApi/routes"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	db.InitDB()
	router := routes.SetupRoutes()

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}).Handler(router)

	log.Println("Server is running on port 8000...")
	log.Fatal(http.ListenAndServe(":8000", corsHandler))
}
