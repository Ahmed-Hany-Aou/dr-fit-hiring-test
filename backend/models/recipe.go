package models

type Recipe struct {
	ID          int         `json:"id"`
	Title       string      `json:"title"`
	Image       *string     `json:"image"`
	PrepTime    int         `json:"prep_time"`
	Ingredients interface{} `json:"ingredients"`
}
