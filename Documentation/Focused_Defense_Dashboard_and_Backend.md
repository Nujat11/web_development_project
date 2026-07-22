# 🎯 Focused Defense Guide: Frontend Dashboard, Frontend CRUD & Backend database.py / CRUD

This guide is specifically tailored to cover:
1. **Frontend Dashboard & CRUD Operations** ([`Dashboard.jsx`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Frontend/src/pages/Dashboard.jsx), [`ExpenseModal.jsx`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Frontend/src/components/ExpenseModal.jsx), [`dataService.js`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Frontend/src/dataService.js))
2. **Backend Database Configuration & CRUD Operations** ([`database.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/database.py), [`expense_routes.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/routes/expense_routes.py), [`expense_controller.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/controllers/expense_controller.py), [`models/expense.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/models/expense.py))

---

## 1. ⚛️ Frontend Dashboard & CRUD Operations

### A. Dashboard Component ([`Dashboard.jsx`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Frontend/src/pages/Dashboard.jsx))

#### Core Responsibilities:
- Holds master state for `transactions`, logged-in `user`, modal status (`isModalOpen`), transaction to edit (`expenseToEdit`), search filter (`searchQuery`), and category filter (`categoryFilter`).
- Computes aggregated summary metrics (**Total Income**, **Total Expense**, **Balance**, **Budget Spending Percentage**).
- Coordinates CRUD actions between UI events and `dataService.js`.

#### Code Walkthrough — State & Data Fetching:
```javascript
const [user, setUser] = useState(null);
const [transactions, setTransactions] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [expenseToEdit, setExpenseToEdit] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    navigate('/login');
  } else {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchTransactions(parsedUser.id);
  }
}, [navigate]);

const fetchTransactions = async (userId) => {
  try {
    const data = await dataService.getExpenses(userId);
    setTransactions(data);
  } catch (err) {
    console.error('Error fetching transactions', err);
  }
};
```
- `useEffect` checks if a user is logged in via `localStorage`. If absent, redirects to `/login`. If present, fetches the user's transactions via `fetchTransactions`.
- `fetchTransactions` calls `dataService.getExpenses(userId)` and updates the `transactions` state array.

---

### B. Frontend CRUD Handler Functions ([`Dashboard.jsx`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Frontend/src/pages/Dashboard.jsx#L60-L82))

#### 1. Create / Update (Save):
```javascript
const handleSave = async (expenseData) => {
  try {
    if (expenseToEdit) {
      await dataService.updateExpense(expenseToEdit.id, expenseData);
    } else {
      await dataService.createExpense(expenseData, user.id);
    }
    setIsModalOpen(false);
    setExpenseToEdit(null);
    fetchTransactions(user.id);
  } catch (err) {
    console.error('Error saving expense', err);
  }
};
```
- **If `expenseToEdit` exists:** Calls `dataService.updateExpense(id, payload)` (HTTP `PUT`).
- **If `expenseToEdit` is null:** Calls `dataService.createExpense(payload, user.id)` (HTTP `POST`).
- Closes modal (`setIsModalOpen(false)`), resets edit state, and triggers `fetchTransactions()` to refresh UI.

#### 2. Delete:
```javascript
const handleDelete = async (id) => {
  try {
    await dataService.deleteExpense(id);
    fetchTransactions(user.id);
  } catch (err) {
    console.error('Error deleting expense', err);
  }
};
```
- Calls `dataService.deleteExpense(id)` (HTTP `DELETE`).
- Refreshes transaction state upon server response.

---

### C. Expense Form Modal ([`ExpenseModal.jsx`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Frontend/src/components/ExpenseModal.jsx))

#### Form Submit Execution:
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  onSave({ title, amount: parseFloat(amount), category, type, date });
};
```
- Prevents page reload (`e.preventDefault()`).
- Parses string `amount` to float number.
- Emits object payload back to parent `Dashboard` via `onSave` prop callback.

---

### D. Data Service Layer ([`dataService.js`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Frontend/src/dataService.js))

Supports dual-mode storage (`local` mock mode in `localStorage` or `api` backend mode via Axios):

```javascript
// READ (GET)
getExpenses: async (userId) => {
  if (getStorageMode() === 'local') {
    return getLocalExpenses().filter(e => e.user_id === userId);
  }
  const res = await api.get(`/expenses/${userId}`);
  return res.data;
},

// CREATE (POST)
createExpense: async (expenseData, userId) => {
  if (getStorageMode() === 'local') { /* local logic */ }
  const res = await api.post('/expenses', { ...expenseData, user_id: userId });
  return res.data;
},

// UPDATE (PUT)
updateExpense: async (expenseId, expenseData) => {
  if (getStorageMode() === 'local') { /* local logic */ }
  const res = await api.put(`/expenses/${expenseId}`, expenseData);
  return res.data;
},

// DELETE (DELETE)
deleteExpense: async (expenseId) => {
  if (getStorageMode() === 'local') { /* local logic */ }
  const res = await api.delete(`/expenses/${expenseId}`);
  return res.data;
}
```

---

## 2. 🐍 Backend Database Setup & CRUD Operations

### A. Database Session Configuration ([`database.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/database.py))

Line-by-line explanation of database connection setup:

```python
1: from sqlalchemy import create_engine
2: from sqlalchemy.orm import sessionmaker, declarative_base
3: import os
4: 
5: DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./expense_tracker.db")
6: 
7: engine = create_engine(
8:     DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
9: )
10: SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
11: Base = declarative_base()
12: 
13: def get_db():
14:     db = SessionLocal()
15:     try:
16:         yield db
17:     finally:
18:         db.close()
```

#### Line-by-Line Breakdown:
- **Line 5:** `DATABASE_URL`: Reads environment variable `DATABASE_URL` (for PostgreSQL on cloud) or defaults to local file SQLite `sqlite:///./expense_tracker.db`.
- **Line 7-9:** `create_engine()`: Initializes SQLAlchemy connection pool. `connect_args={"check_same_thread": False}` allows SQLite to handle multi-threaded web requests safely.
- **Line 10:** `SessionLocal`: Factory class for instantiating database sessions. `autocommit=False` ensures transactions are committed explicitly.
- **Line 11:** `Base`: Declarative base class inherited by all database models (`User`, `Expense`).
- **Line 13-18:** `get_db()`: Generator function used as a FastAPI `Depends` dependency. Creates a clean database session per HTTP request and guarantees it is closed (`db.close()`) after response delivery.

---

### B. Database Model ([`models/expense.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/models/expense.py))

```python
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from database import Base

class Expense(Base):
    __tablename__ = "expenses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    title = Column(String, index=True)
    amount = Column(Float)
    category = Column(String, index=True)
    type = Column(String) # 'Income' or 'Expense'
    date = Column(Date)
```
- Maps Python `Expense` class directly to database table `expenses`.
- Foreign key `user_id` links transactions to `users.id`.

---

### C. Backend CRUD Controller Functions ([`expense_controller.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/controllers/expense_controller.py))

Line-by-line explanation of database CRUD methods:

#### 1. READ (Get User Expenses):
```python
def get_expenses_by_user(db: Session, user_id: int):
    return db.query(Expense).filter(Expense.user_id == user_id).all()
```
- Runs SQL query: `SELECT * FROM expenses WHERE user_id = :user_id`.

#### 2. CREATE (Add Expense):
```python
def create_expense(db: Session, expense: ExpenseCreate):
    db_expense = Expense(**expense.model_dump())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense
```
- Converts Pydantic input to dict (`model_dump()`) and instantiates `Expense`.
- `db.add()` queues new row; `db.commit()` saves to disk; `db.refresh()` gets auto-generated `id`.

#### 3. UPDATE (Modify Expense):
```python
def update_expense(db: Session, expense_id: int, expense: ExpenseUpdate):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if db_expense:
        update_data = expense.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_expense, key, value)
        db.commit()
        db.refresh(db_expense)
    return db_expense
```
- Queries target row by `id`. If found, updates modified non-null fields using `setattr()` and commits changes.

#### 4. DELETE (Remove Expense):
```python
def delete_expense(db: Session, expense_id: int):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if db_expense:
        db.delete(db_expense)
        db.commit()
    return db_expense
```
- Finds row by `id`, deletes it via `db.delete()`, and commits transaction.

---

### D. Backend CRUD API Routes ([`expense_routes.py`](file:///c:/Users/Arpy/OneDrive/Documents/New%20folder/web_development_project/web_development_project/Backend/routes/expense_routes.py))

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseOut
from controllers import expense_controller

router = APIRouter(tags=["expenses"])

# CREATE
@router.post("/expenses", response_model=ExpenseOut)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    return expense_controller.create_expense(db=db, expense=expense)

# READ
@router.get("/expenses/{user_id}", response_model=List[ExpenseOut])
def read_user_expenses(user_id: int, db: Session = Depends(get_db)):
    return expense_controller.get_expenses_by_user(db, user_id=user_id)

# UPDATE
@router.put("/expenses/{expense_id}", response_model=ExpenseOut)
def update_expense(expense_id: int, expense: ExpenseUpdate, db: Session = Depends(get_db)):
    updated_expense = expense_controller.update_expense(db, expense_id, expense)
    if not updated_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return updated_expense

# DELETE
@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    deleted = expense_controller.delete_expense(db, expense_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"detail": "Expense deleted"}
```

---

## 📊 Complete CRUD Mapping Summary Matrix

| Operation | HTTP Method | Frontend Call (`dataService.js`) | Backend Route (`expense_routes.py`) | Controller Function (`expense_controller.py`) | Database Action (`SQLAlchemy`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create** | `POST` | `createExpense(data, userId)` | `POST /expenses` | `create_expense()` | `db.add()` & `db.commit()` |
| **Read** | `GET` | `getExpenses(userId)` | `GET /expenses/{user_id}` | `get_expenses_by_user()` | `db.query().filter().all()` |
| **Update** | `PUT` | `updateExpense(id, data)` | `PUT /expenses/{expense_id}` | `update_expense()` | `setattr()` & `db.commit()` |
| **Delete** | `DELETE` | `deleteExpense(id)` | `DELETE /expenses/{expense_id}` | `delete_expense()` | `db.delete()` & `db.commit()` |
