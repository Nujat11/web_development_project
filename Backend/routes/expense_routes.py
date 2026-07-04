from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseOut
from controllers import expense_controller

router = APIRouter(tags=["expenses"])

@router.post("/expenses", response_model=ExpenseOut)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    return expense_controller.create_expense(db=db, expense=expense)

@router.get("/expenses/{user_id}", response_model=List[ExpenseOut])
def read_user_expenses(user_id: int, db: Session = Depends(get_db)):
    return expense_controller.get_expenses_by_user(db, user_id=user_id)

@router.put("/expenses/{expense_id}", response_model=ExpenseOut)
def update_expense(expense_id: int, expense: ExpenseUpdate, db: Session = Depends(get_db)):
    updated_expense = expense_controller.update_expense(db, expense_id, expense)
    if not updated_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return updated_expense

@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    deleted = expense_controller.delete_expense(db, expense_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"detail": "Expense deleted"}
