import json
import os
from datetime import date

DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")

class Store:
    def __init__(self):
        self.users = []
        self.expenses = []
        self.user_id_counter = 1
        self.expense_id_counter = 1
        self.load_data()

    def load_data(self):
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.users = data.get("users", [])
                    self.expenses = data.get("expenses", [])
                    self.user_id_counter = max([u.get("id", 0) for u in self.users], default=0) + 1
                    self.expense_id_counter = max([e.get("id", 0) for e in self.expenses], default=0) + 1
            except Exception:
                self.users = []
                self.expenses = []

    def save_data(self):
        try:
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump({"users": self.users, "expenses": self.expenses}, f, indent=2, default=str)
        except Exception as e:
            print(f"Error saving data: {e}")

store = Store()
