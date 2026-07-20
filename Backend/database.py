# In-memory storage instead of full SQL/NoSQL database

# Global in-memory lists/dicts as mock storage
users = {}      # email -> User
expenses = []   # list of Expense

# ID counters
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

def get_db():
    """
    Keep function signature for dependency injection in routes
    but yield None as there is no real database connection session.
    """
    yield None
