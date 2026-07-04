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
