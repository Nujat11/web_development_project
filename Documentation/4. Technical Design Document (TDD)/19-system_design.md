# 19 - System Design (Architecture)

The **Personal Expense Tracker** follows a classic 3-tier architecture with an MVC pattern in the backend.

```mermaid
graph TD
    subgraph Client_Layer
        Web[React SPA]
    end
    subgraph Server_Layer_MVC
        Router[Routers / Controllers]
        Schema[Pydantic / Views]
        CRUD[CRUD Operations / Logic]
        Model[SQLAlchemy Models]
    end
    subgraph Data_Layer
        DB[(SQL Database)]
    end

    Web -- "HTTP/JSON" --> Router
    Router -- "Validates with" --> Schema
    Router -- "Calls" --> CRUD
    CRUD -- "Uses" --> Model
    Model -- "ORM Queries" --> DB
```

### Components:
1. **Frontend (React):** Handles the user interface, routing, and data visualization (Pie Charts).
2. **Backend (FastAPI - MVC Pattern):** 
   - **Controllers (Routers):** Handles incoming HTTP requests and routes them.
   - **Views (Schemas):** Validates and formats the data sent and received.
   - **Models:** Represents database tables and logic using SQLAlchemy and CRUD functions.
3. **Database (SQLite/PostgreSQL):** Stores users and transaction history persistently.
4. **Authentication:** Uses secure token-based session management.
