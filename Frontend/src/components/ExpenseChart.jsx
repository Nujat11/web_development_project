import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function ExpenseChart({ data }) {
  const expenses = data.filter(d => d.type === 'Expense');
  
  const groupedData = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map(key => ({
    name: key,
    value: groupedData[key]
  }));

  const COLORS = ['#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#9b59b6', '#e74c3c'];

  if (chartData.length === 0) {
    return <div style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>No expenses yet to show chart.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} 
          itemStyle={{ color: '#fff' }} 
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;
