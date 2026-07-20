import database
from models.expense import Expense
from schemas.expense import ExpenseCreate, ExpenseUpdate

def get_expenses_by_user(db, user_id: int):
    return [e for e in database.expenses if e.user_id == user_id]

def create_expense(db, expense: ExpenseCreate):
    e_id = database.next_expense_id()
    db_expense = Expense(
        id=e_id,
        user_id=expense.user_id,
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        type=expense.type,
        date=expense.date
    )
    database.expenses.append(db_expense)
    return db_expense

def update_expense(db: Session, expense_id: int, expense: ExpenseUpdate):
def update_expense(db, expense_id: int, expense: ExpenseUpdate):
    for e in database.expenses:
        if e.id == expense_id:
            update_data = expense.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(e, key, value)
            return e
    return None

def delete_expense(db, expense_id: int):
    for i, e in enumerate(database.expenses):
        if e.id == expense_id:
            return database.expenses.pop(i)
    return None
