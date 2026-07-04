import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ExpenseModal from '../components/ExpenseModal';
import ExpenseChart from '../components/ExpenseChart';
import api from '../api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchTransactions(parsedUser.id);
    }
  }, [navigate]);

  const fetchTransactions = async (userId) => {
    try {
      const res = await api.get(`/expenses/${userId}`);
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions', err);
    }
  };

  const handleSave = async (expenseData) => {
    try {
      if (expenseToEdit) {
        await api.put(`/expenses/${expenseToEdit.id}`, expenseData);
      } else {
        await api.post('/expenses', { ...expenseData, user_id: user.id });
      }
      setIsModalOpen(false);
      setExpenseToEdit(null);
      fetchTransactions(user.id);
    } catch (err) {
      console.error('Error saving expense', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchTransactions(user.id);
    } catch (err) {
      console.error('Error deleting expense', err);
    }
  };

  const openAddModal = () => {
    setExpenseToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (t) => {
    setExpenseToEdit(t);
    setIsModalOpen(true);
  };

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="welcome-msg">Hello, <span>{user.name}</span>!</h1>
        
        <div className="cards-container">
          <div className="glass-panel stat-card">
            <div className="title">Total Balance</div>
            <div className="amount">৳{balance.toFixed(2)}</div>
          </div>
          <div className="glass-panel stat-card income-card">
            <div className="title">Total Income</div>
            <div className="amount income">+৳{totalIncome.toFixed(2)}</div>
          </div>
          <div className="glass-panel stat-card expense-card">
            <div className="title">Total Expense</div>
            <div className="amount expense">-৳{totalExpense.toFixed(2)}</div>
          </div>
        </div>

        <div className="content-section">
          <div className="glass-panel transactions-list">
            <div className="section-header">
              <h2 className="section-title">Recent Transactions</h2>
              <button className="btn-primary btn-small" onClick={openAddModal}>+ Add New</button>
            </div>
            
            <div className="transaction-list-wrap">
              {transactions.length === 0 ? (
                <div style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>No transactions found. Adding some might inspire you!</div>
              ) : (
                transactions.map((t) => (
                  <div className="transaction-item" key={t.id}>
                    <div className="t-info">
                      <div className="t-title">{t.title}</div>
                      <div className="t-cat">{t.category}</div>
                    </div>
                    <div className="t-right">
                      <div className={`t-amt ${t.type === 'Income' ? 'income' : 'expense'}`}>
                        {t.type === 'Income' ? '+' : '-'}৳{t.amount.toFixed(2)}
                      </div>
                      <div className="t-date">{t.date}</div>
                    </div>
                    <div className="t-actions">
                      <button className="btn-edit" onClick={() => openEditModal(t)}>Edit</button>
                      <button className="btn-del" onClick={() => handleDelete(t.id)}>Del</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel chart-section">
            <div className="section-header">
              <h2 className="section-title">Expense Summary</h2>
            </div>
            <ExpenseChart data={transactions} />
          </div>
        </div>
      </div>
      
      <ExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        expenseToEdit={expenseToEdit} 
      />
    </>
  );
}

export default Dashboard;
