# In-memory storage instead of full database
import os

# Global in-memory storage dicts and lists
users = {}      # email -> User
expenses = []   # list of Expense

<<<<<<< Updated upstream
# Render databases connect with the postgres:// scheme, which standard SQLAlchemy 1.4+ no longer supports.
# Standardize it to postgresql:// for correct PostgreSQL driver lookup.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
=======
_user_id_counter = 1
_expense_id_counter = 1

def next_user_id() -> int:
    global _user_id_counter
    uid = _user_id_counter
    _user_id_counter += 1
    return uid

def next_expense_id() -> int:
    global _expense_id_counter
    eid = _expense_id_counter
    _expense_id_counter += 1
    return eid
>>>>>>> Stashed changes

def get_db():
    # Keep function signature for dependency injection
    yield None
