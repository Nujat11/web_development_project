import { useState, useEffect } from 'react';

function ExpenseModal({ isOpen, onClose, onSave, expenseToEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('Expense');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setType(expenseToEdit.type);
      setDate(expenseToEdit.date);
    } else {
      setTitle('');
      setAmount('');
      setCategory('Food');
      setType('Expense');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [expenseToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, amount: parseFloat(amount), category, type, date });
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h3 className="section-title" style={{marginBottom: "20px"}}>{expenseToEdit ? 'Edit Transaction' : 'Add Transaction'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="input-glass" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="flex-row">
            <div className="form-group" style={{flex: 1}}>
              <label>Amount ($)</label>
              <input type="number" step="0.01" className="input-glass" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label>Date</label>
              <input type="date" className="input-glass" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <div className="flex-row">
            <div className="form-group" style={{flex: 1}}>
              <label>Type</label>
              <select className="input-glass" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label>Category</label>
              <select className="input-glass" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Salary">Salary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary">Save Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;
