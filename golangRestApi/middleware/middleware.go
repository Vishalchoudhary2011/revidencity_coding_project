package middleware

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func ValidateID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		idStr := vars["id"]

		if _, err := strconv.Atoi(idStr); err != nil {
			http.Error(w, "Invalid task ID", http.StatusBadRequest)
			return
		}

		next.ServeHTTP(w, r)
	})
}
