# 🎓 Super Easy Viva Defense Cheat Sheet (সহজ বাংলায় শিক্ষককে উত্তর দেওয়ার জন্য)

এই শিটটি এমনভাবে লেখা হয়েছে যাতে শিক্ষক ভাইভাতে প্রশ্ন করা মাত্রই আপনি সরাসরি এই বাংলা উত্তরগুলো গুছিয়ে বলতে পারেন।

---

## ⚛️ ১. Frontend Dashboard & CRUD (ভাইভাতে সহজে উত্তর দেওয়ার জন্য)

### 📌 প্রশ্ন ১: Dashboard পেজে কি হচ্ছে?
> **উত্তর:**  
> "স্যার, `Dashboard.jsx`-এ আমরা `useState` দিয়ে `transactions` (খরচের লিস্ট), `user` (লগইন করা ইউজারের ডাটা) এবং Modal open/close হওয়া নিয়ন্ত্রণ করি।  
> পেজ লোড হওয়ার সাথে সাথে `useEffect` হুক চালু হয় এবং `fetchTransactions()` ফাংশন দিয়ে Backend API থেকে সব ট্রানজেকশন নিয়ে এসে স্ক্রিনে দেখায়।"

---

### 📌 প্রশ্ন ২: Frontend-এ Create (নতুন খরচ যোগ করা) এবং Update (সম্পাদনা) কিভাবে কাজ করে?
> **উত্তর:**  
> "স্যার, ইউজার Form ফিলআপ করে 'Save' বাটনে ক্লিক করলে `ExpenseModal.jsx`-এর `handleSubmit` কাজ করে।  
> - **নতুন ডাটা যোগ করলে:** `dataService.createExpense()` দিয়ে Backend-এ `POST` রিকোয়েস্ট পাঠানো হয়।  
> - **পুরাতন ডাটা Edit করলে:** `dataService.updateExpense()` দিয়ে `PUT` রিকোয়েস্ট পাঠানো হয়।  
> Backend থেকে রেসপন্স আসলে Modal-টি বন্ধ হয় এবং Dashboard-এর ডাটা অটোমেটিক রিফ্রেশ হয়ে আপডেট ডাটা দেখায়।"

---

### 📌 প্রশ্ন ৩: Delete (মুছে ফেলা) কিভাবে কাজ করে?
> **উত্তর:**  
> "স্যার, ট্রানজেকশন সারির Delete বাটনে চাপ দিলে `handleDelete(id)` কল হয়। এটি `dataService.deleteExpense(id)`-এর মাধ্যমে Backend-এ `DELETE` রিকোয়েস্ট পাঠায়। Backend থেকে মুছে যাওয়ার পর Dashboard আবার রিফ্রেশ হয়ে যায়।"

---

## 🐍 ২. Backend database.py & Database Connection

### 📌 প্রশ্ন ৪: `database.py` ফাইলে কি কাজ করা হয়েছে?
> **উত্তর:**  
> "স্যার, `database.py`-তে ৩টি প্রধান কাজ করা হয়েছে:  
> ১. **`create_engine()`:** ডাটাবেজের সাথে সংযোগ তৈরি করে (আমরা SQLite ব্যবহার করেছি `expense_tracker.db` ফাইল হিসেবে)।  
> ২. **`SessionLocal`:** প্রতিটি API রিকোয়েস্টের জন্য একটি আলাদা Database Session তৈরি করে।  
> ৩. **`get_db()`:** এটি একটি Generator function। প্রতিবার API রিকোয়েস্ট এলে ডাটাবেজ সেশন চালু করে এবং কাজ শেষে `finally` ব্লকে `db.close()` দিয়ে সেশন বন্ধ করে দেয় যাতে মেমোরি লিক না হয়।"

---

### 📌 প্রশ্ন ৫: Database Model ও Schema-র মধ্যে পার্থক্য কি?
> **উত্তর:**  
> "স্যার,  
> - **Model (`models/expense.py`):** SQLAlchemy দিয়ে ডাটাবেজ টেবিল তৈরি করে (যেমন: `id`, `title`, `amount`, `category`, `date`, `user_id` কলাম)।  
> - **Schema (`schemas/expense.py`):** Pydantic দিয়ে Frontend থেকে আসা ডাটা সথিক টাইপের কিনা (Validation) তা চেক করে (যেমন: amount যেন অবশ্যই float হয়)।"

---

## ⚙️ ৩. Backend CRUD Operation (ডাটাবেজে সেভ হওয়া)

### 📌 প্রশ্ন ৬: Backend-এ API Request আসার পর ডাটা ডাটাবেজে কিভাবে সেভ হয়?
> **উত্তর:**  
> "স্যার, পুরো প্রসেসটি ৩টি স্টেপে ঘটে:  
> ১. **Route (`expense_routes.py`):** `POST /expenses` এন্ডপয়েন্টে রিকোয়েস্ট পাওয়ার সাথে সাথে Validator দিয়ে ডাটা চেক করে Controller-এ পাঠায়।  
> ২. **Controller (`expense_controller.py`):** `create_expense()` ফাংশন রান হয়।  
> ৩. **Database (`SQLAlchemy`):**  
>    - `db.add(db_expense)` ➔ ডাটাবেজে নতুন ডাটা যুক্ত করে।  
>    - `db.commit()` ➔ ডাটাবেজে স্থায়ীভাবে সেভ (Save) করে।  
>    - `db.refresh(db_expense)` ➔ ডাটাবেজের Auto-generated Primary Key `id` সহ পুরো অবজেক্টটি Frontend-এ ফেরত পাঠায়।"

---

### 📌 প্রশ্ন ৭: Delete ও Update ডাটাবেজে কিভাবে কাজ করে?
> **উত্তর:**  
> - **Update:** `db.query(Expense).filter(Expense.id == expense_id).first()` দিয়ে ডাটা আইডি ধরে খুঁজে বের করে, `setattr()` দিয়ে মানগুলো আপডেট করে `db.commit()` দেওয়া হয়।  
> - **Delete:** ডাটাটি খুঁজে পাওয়ার পর `db.delete(db_expense)` এবং `db.commit()` করা হয়। যদি আইডি না পাওয়া যায় তবে Server `404 Not Found` রিটার্ন করে।

---

## 📊 ১ নজরে ভাইভা ট্রিক (Cheat Table)

| CRUD কাজ | Frontend Method | HTTP Type | Backend Route | SQLAlchemy DB Command |
| :--- | :--- | :--- | :--- | :--- |
| **Create (যোগ)** | `createExpense()` | `POST` | `/expenses` | `db.add()` + `db.commit()` |
| **Read (দেখা)** | `getExpenses()` | `GET` | `/expenses/{user_id}` | `db.query().filter().all()` |
| **Update (এডিট)** | `updateExpense()` | `PUT` | `/expenses/{id}` | `setattr()` + `db.commit()` |
| **Delete (মুছা)** | `deleteExpense()` | `DELETE` | `/expenses/{id}` | `db.delete()` + `db.commit()` |
