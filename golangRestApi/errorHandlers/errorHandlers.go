package errorHandlers

import (
	"net/http"
)

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "Route not found", http.StatusNotFound)
}
