from store import store
from schemas.expense import ExpenseCreate, ExpenseUpdate

def get_expenses_by_user(user_id: int):
    return [e for e in store.expenses if e.get("user_id") == user_id]

def create_expense(expense: ExpenseCreate):
    exp_dict = {
        "id": store.expense_id_counter,
        **expense.model_dump()
    }
    store.expense_id_counter += 1
    store.expenses.append(exp_dict)
    store.save_data()
    return exp_dict

def update_expense(expense_id: int, expense: ExpenseUpdate):
    for idx, e in enumerate(store.expenses):
        if e.get("id") == expense_id:
            update_data = expense.model_dump(exclude_unset=True)
            for key, val in update_data.items():
                if val is not None:
                    e[key] = val
            store.save_data()
            return e
    return None

def delete_expense(expense_id: int):
    for idx, e in enumerate(store.expenses):
        if e.get("id") == expense_id:
            store.expenses.pop(idx)
            store.save_data()
            return True
    return False
