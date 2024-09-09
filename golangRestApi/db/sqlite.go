package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./tasksInfo.db")
	if err != nil {
		log.Fatal(err)
	}

	sqlStmt := `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    completed BOOLEAN DEFAULT 0
);
;`
	_, err = DB.Exec(sqlStmt)
	if err != nil {
		log.Fatal(err)
	}
}
