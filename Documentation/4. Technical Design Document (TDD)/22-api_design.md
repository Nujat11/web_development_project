# 22 - API Design (REST Endpoints)

All API requests and responses will be in **JSON** format.

## Auth Endpoints
| Method | Endpoint | Description |
|---|---|---|
| **POST** | `/auth/register` | Create a new user account. |
| **POST** | `/auth/login` | Login and receive a JWT token. |

## Transaction Endpoints (Requires Auth)
| Method | Endpoint | Description |
|---|---|---|
| **GET** | `/transactions` | Get all transactions for the user. |
| **POST** | `/transactions` | Create a new transaction record. |
| **GET** | `/transactions/{id}`| Get details of a specific transaction. |
| **PUT** | `/transactions/{id}`| Update an existing transaction. |
| **DELETE** | `/transactions/{id}`| Delete a transaction. |

## Dashboard Endpoints (Requires Auth)
| Method | Endpoint | Description |
|---|---|---|
| **GET** | `/dashboard/summary`| Get current balance and budget status. |
| **GET** | `/dashboard/charts` | Get category-wise data for Pie Charts. |
