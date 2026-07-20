import bcrypt
import database
from models.user import User
from schemas.user import UserCreate

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    pwd_bytes = password.encode('utf-8')
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_user_by_email(db, email: str):
    return database.users.get(email)

def create_user(db, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    u_id = database.next_user_id()
    db_user = User(id=u_id, name=user.name, email=user.email, password=hashed_password)
    database.users[user.email] = db_user
    return db_user
