import bcrypt
from store import store
from schemas.user import UserCreate

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    pwd_bytes = password.encode('utf-8')
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_user_by_email(email: str):
    for u in store.users:
        if u.get("email") == email:
            return u
    return None

def create_user(user: UserCreate):
    hashed_password = get_password_hash(user.password)
    user_dict = {
        "id": store.user_id_counter,
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }
    store.user_id_counter += 1
    store.users.append(user_dict)
    store.save_data()
    return user_dict
