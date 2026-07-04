# 18 - Entity Relationship Diagram (ERD)

This diagram represents the database structure for the **Personal Expense Tracker**.

```mermaid
erDiagram
    USER {
        int id PK
        string email
        string password_hash
        datetime created_at
    }
    TRANSACTION {
        int id PK
        float amount
        string category
        string type "Income/Expense"
        datetime date
        int user_id FK
    }
    USER ||--o{ TRANSACTION : "has"
```

### Entity Details:
1. **USER:** Stores authentication and profile data. 
    - One user can have many transactions.
2. **TRANSACTION:** Stores the individual logs.
    - Each transaction is linked to exactly one user via `user_id`.
