# 21 - Database Design

## Table: `users`
Stores user account information.

| Column | Type | Constraints |
|---|---|---|
| `id` | Integer | Primary Key, Auto-increment |
| `email` | String | Unique, Not Null |
| `password_hash` | String | Not Null |
| `created_at` | DateTime | Default: current_timestamp |

## Table: `transactions`
Stores spending and income records.

| Column | Type | Constraints |
|---|---|---|
| `id` | Integer | Primary Key, Auto-increment |
| `user_id` | Integer | Foreign Key -> `users.id` |
| `amount` | Float | Not Null |
| `category` | String | Not Null (e.g., Food, Travel) |
| `type` | String | Not Null (Income or Expense) |
| `date` | Date | Not Null |
| `notes` | Text | Optional |
