package routes

import (
	"golangRestApi/errorHandlers"
	"golangRestApi/handlers"
	"golangRestApi/middleware"

	"net/http"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/tasks", handlers.GetTasks).Methods("GET")
	r.HandleFunc("/tasks", handlers.CreateTask).Methods("POST")
	r.Handle("/tasks/{id}", middleware.ValidateID(http.HandlerFunc(handlers.UpdateTask))).Methods("PUT")
	r.Handle("/tasks/{id}", middleware.ValidateID(http.HandlerFunc(handlers.DeleteTask))).Methods("DELETE")

	r.NotFoundHandler = http.HandlerFunc(errorHandlers.NotFoundHandler)

	return r
}
