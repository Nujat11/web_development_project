from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseOut
from controllers import expense_controller

router = APIRouter(tags=["expenses"])

@router.post("/expenses", response_model=ExpenseOut, status_code=status.HTTP_201_CREATED, summary="Create a new expense or income record")
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    """
    Create a new transaction (Expense or Income) for a user.
    """
    return expense_controller.create_expense(db=db, expense=expense)

@router.get("/expenses/{user_id}", response_model=List[ExpenseOut], summary="Retrieve all transactions for a specific user")
def read_user_expenses(user_id: int, db: Session = Depends(get_db)):
    """
    Fetch all expense and income records belonging to a user ID.
    """
    return expense_controller.get_expenses_by_user(db, user_id=user_id)

@router.put("/expenses/{expense_id}", response_model=ExpenseOut, summary="Update an existing transaction")
def update_expense(expense_id: int, expense: ExpenseUpdate, db: Session = Depends(get_db)):
    """
    Update details of a transaction by its expense ID.
    """
    updated_expense = expense_controller.update_expense(db, expense_id, expense)
    if not updated_expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    return updated_expense

@router.delete("/expenses/{expense_id}", summary="Delete a transaction")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    """
    Remove a transaction record from the database by its ID.
    """
    deleted = expense_controller.delete_expense(db, expense_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    return {"detail": "Expense deleted successfully"}

