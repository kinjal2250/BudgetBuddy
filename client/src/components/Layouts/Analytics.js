import React from 'react';
import { Progress } from 'antd';
import './Analytics.css'; // Assuming you're adding styles in this CSS file

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
  ];

  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'income');
  const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'expense');
  const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;
  const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnover = allTransaction
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <h1 className="analytics-title">Analytics</h1>
      <div className="row m-3 justify-content-center"> {/* Center align using justify-content-center */}
        <div className="col-md-4">
          <div className="glass-card">
            <div className="card-header">Total Transactions: {totalTransaction}</div>
            <div className="card-body text-center"> {/* Center align text */}
              <h5>Income: {totalIncomeTransactions.length}</h5>
              <h5>Expense: {totalExpenseTransactions.length}</h5>
              <div className="progress-container">
                <Progress
                  type="circle"
                  strokeColor="#ff69b4"
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                  format={percent => <span style={{ color: '#ff00d0' }}>{percent}%</span>}
                />
                <Progress
                  type="circle"
                  strokeColor="#ff1493"
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                  format={percent => <span style={{ color: '#ff00d0' }}>{percent}%</span>}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="glass-card">
            <div className="card-header">Total Turnover: {totalTurnover}</div>
            <div className="card-body text-center">
              <h5>Income: {totalIncomeTurnover}</h5>
              <h5>Expense: {totalExpenseTurnover}</h5>
              <div className="progress-container">
                <Progress
                  type="circle"
                  strokeColor="#ff69b4"
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                  format={percent => <span style={{ color: '#ff00d0' }}>{percent}%</span>}
                />
                <Progress
                  type="circle"
                  strokeColor="#ff1493"
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                  format={percent => <span style={{ color: '#ff00d0' }}>{percent}%</span>}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category-wise Income */}
      <div className="row mt-3 justify-content-center"> {/* Center align using justify-content-center */}
        <div className="col-md-5">
          <h4 className="category-header">Category-wise Income</h4>
          {categories.map(category => {
            const amount = allTransaction
              .filter(transaction => transaction.type === 'income' && transaction.category === category)
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="glass-card" key={category}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress 
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} 
                      strokeColor="#ff00d0" // Pink color for income progress
                      format={percent => <span style={{ color: '#ff00d0' }}>{percent}%</span>}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>

      {/* Category-wise Expense */}
      <div className="row mt-3 justify-content-center"> {/* Center align using justify-content-center */}
        <div className="col-md-5">
          <h4 className="category-header">Category-wise Expense</h4>
          {categories.map(category => {
            const amount = allTransaction
              .filter(transaction => transaction.type === 'expense' && transaction.category === category)
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="glass-card" key={category}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} 
                    strokeColor="#ff00d0" // Pink color for income progress
                    format={percent => <span style={{ color: '#ff00d0' }}>{percent}%</span>}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
