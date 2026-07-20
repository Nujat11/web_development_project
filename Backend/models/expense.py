class Expense:
    def __init__(self, id: int, user_id: int, title: str, amount: float, category: str, type: str, date):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.amount = amount
        self.category = category
        self.type = type
        self.date = date
