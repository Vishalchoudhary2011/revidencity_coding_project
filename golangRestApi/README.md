# Task Management Backend (Golang + SQLite)

This is the backend for a task management application built using Golang and SQLite. The backend provides RESTful API endpoints for creating, reading, updating, and deleting tasks. Tasks include information like title, description, and completion status.

## Features

- **Create Tasks**: Add new tasks with a title, description, and status.
- **Read Tasks**: Retrieve all tasks or a specific task by ID.
- **Update Task Status**: Mark tasks as complete or incomplete.
- **Delete Tasks**: Remove tasks by ID.
- **SQLite**: Lightweight database for local storage.
- **Logging**: Detailed logging of data being added, updated, or modified.
- **Error Handling**: Robust error handling for validation, database operations, and more.

## Software Configuration

Golang Sofware : https://go.dev/dl/
SQLITE3 : https://www.sqlite.org/download.html
MINGW: https://sourceforge.net/projects/mingw-w64/

### Languages & Frameworks:
- **Golang**: Backend programming language.
- **SQLite**: Lightweight relational database used for local storage.

### Libraries/Packages:
- **Gorilla Mux**: HTTP router and dispatcher for matching incoming requests to the appropriate handlers.
  - Install with: `go get -u github.com/gorilla/mux`
  
- **Logrus**: A structured logger for Go, used for logging actions in the application.
  - Install with: `go get -u github.com/sirupsen/logrus`
  
- **CORS Middleware**: Cross-origin resource sharing middleware for handling requests from the frontend.
  - Install with: `go get -u github.com/rs/cors`

### Environment:
- **Go version**: `>= 1.18`
- **SQLite version**: SQLite is embedded, so no installation is necessary. Ensure Go has SQLite capabilities enabled.

### Tools:
- **Postman or Curl**: To test the API endpoints.

## Project Structure

```bash
├── main.go                  # Entry point for the application
├── routes                   # Routing logic for the API
│   └── task_routes.go        # Task-related API routes
├── controllers               # Business logic for handling requests
│   └── task_controller.go    # Handlers for task creation, update, etc.
├── models                    # Database models and schema
│   └── task.go               # Task model representing a task entity
├── database                  # Database setup and connection handling
│   └── setup.go              # Initializes SQLite database
├── middleware                # Middleware for request validation
│   └── id_validation.go      # Middleware to validate task IDs
├── errorHandlers             # Error handling functions
│   └── errorHandlers.go      # Centralized error handling
├── go.mod                    # Go module definition
└── go.sum                    # Dependency versions

## To run the project 

go run main.go

##server using this port to gets run : 8000