import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ExpenseModal from '../components/ExpenseModal';
import ExpenseChart from '../components/ExpenseChart';
import api from '../api';

const CATEGORY_ICONS = {
  Food: '🍔', Transport: '🚌', Rent: '🏠',
  Entertainment: '🎬', Salary: '💼', Other: '📦',
};

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

  const openAddModal = () => { setExpenseToEdit(null); setIsModalOpen(true); };
  const openEditModal = (t) => { setExpenseToEdit(t); setIsModalOpen(true); };

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const fmt = (n) => `৳ ${n.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (!user) return null;

  const today = new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <div className="welcome-msg">Hello, <span>{user.name}</span>! 👋</div>
            <div className="welcome-sub">{today}</div>
          </div>
          <button className="btn-primary btn-small" onClick={openAddModal} style={{ width: 'auto', padding: '10px 20px' }}>
            + Add Transaction
          </button>
        </div>

        {/* Stat Cards */}
        <div className="cards-container">
          <div className="glass-panel stat-card">
            <div className="card-icon">💰</div>
            <div className="title">Total Balance</div>
            <div className="amount" style={{ color: balance >= 0 ? 'var(--income-color)' : 'var(--expense-color)' }}>
              {fmt(balance)}
            </div>
            <div className="card-trend">{transactions.length} total transactions</div>
          </div>
          <div className="glass-panel stat-card income-card">
            <div className="card-icon">📈</div>
            <div className="title">Total Income</div>
            <div className="amount income">{fmt(totalIncome)}</div>
            <div className="card-trend">{transactions.filter(t => t.type === 'Income').length} income entries</div>
          </div>
          <div className="glass-panel stat-card expense-card">
            <div className="card-icon">📉</div>
            <div className="title">Total Expense</div>
            <div className="amount expense">{fmt(totalExpense)}</div>
            <div className="card-trend">{transactions.filter(t => t.type === 'Expense').length} expense entries</div>
          </div>
        </div>

        {/* Content */}
        <div className="content-section">
          {/* Transactions */}
          <div className="glass-panel transactions-list">
            <div className="section-header">
              <h2 className="section-title">Recent Transactions</h2>
              <button className="btn-primary btn-small" onClick={openAddModal}>+ Add New</button>
            </div>
            <div className="transaction-list-wrap">
              {transactions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📭</div>
                  <p>No transactions yet.<br />Add your first one to get started!</p>
                </div>
              ) : (
                [...transactions].reverse().map((t) => (
                  <div className="transaction-item" key={t.id}>
                    <div className={`t-icon ${t.type === 'Income' ? 'income-icon' : 'expense-icon'}`}>
                      {CATEGORY_ICONS[t.category] || '📦'}
                    </div>
                    <div className="t-info">
                      <div className="t-title">{t.title}</div>
                      <span className="t-cat">{t.category}</span>
                    </div>
                    <div className="t-right">
                      <div className={`t-amt ${t.type === 'Income' ? 'income' : 'expense'}`}>
                        {t.type === 'Income' ? '+' : '-'}{fmt(t.amount)}
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

          {/* Chart */}
          <div className="glass-panel chart-section">
            <div className="section-header">
              <h2 className="section-title">Expense Summary</h2>
            </div>
            {transactions.length === 0 ? (
              <div className="chart-placeholder">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.4 }}>📊</div>
                  <p>Add transactions to see your chart</p>
                </div>
              </div>
            ) : (
              <ExpenseChart data={transactions} />
            )}
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
