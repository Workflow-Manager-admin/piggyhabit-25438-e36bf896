import React, { useState } from 'react';
import './App.css';

/* --- Placeholder Components for All Main Features --- */

/* Removed in-file BalanceDisplay and PiggyBankGraphic as they're now external components */

// PUBLIC_INTERFACE
function AddSavingsForm({ onAdd }) {
  /** Form to add a savings amount */
  const [amount, setAmount] = useState('');
  return (
    <form
      className="add-savings-form"
      onSubmit={(e) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (numAmount > 0) {
          onAdd(numAmount);
          setAmount('');
        }
      }}
      aria-label="Add Savings Form"
    >
      <label>
        Add Amount
        <input 
          type="number" 
          min="0.01" 
          step="0.01"
          required 
          value={amount} 
          aria-label="Amount to Add"
          onChange={e => setAmount(e.target.value)}
        />
      </label>
      <button className="btn" type="submit">Add</button>
    </form>
  );
}

// PUBLIC_INTERFACE
function WithdrawSavingsForm({ balance, onWithdraw }) {
  /** Form to withdraw a savings amount, preventing overdraft */
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  return (
    <form
      className="withdraw-savings-form"
      onSubmit={(e) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (numAmount > balance) {
          setError('Not enough balance!');
        } else if (numAmount > 0) {
          setError('');
          onWithdraw(numAmount);
          setAmount('');
        }
      }}
      aria-label="Withdraw Savings Form"
    >
      <label>
        Withdraw Amount
        <input
          type="number"
          min="0.01"
          step="0.01"
          required
          value={amount}
          aria-label="Amount to Withdraw"
          onChange={e => setAmount(e.target.value)}
        />
      </label>
      <button className="btn" type="submit">Withdraw</button>
      {error && <div className="form-error" style={{ color: '#FBC02D', marginTop: '0.5em' }}>{error}</div>}
    </form>
  );
}

// PUBLIC_INTERFACE
function HistoryList({ transactions }) {
  /** Lists all savings and withdrawal transactions */
  if (!transactions.length) {
    return <div className="history-list" aria-label="No Transactions">No savings/withdrawals yet.</div>;
  }
  return (
    <div className="history-list" aria-label="Savings History">
      <h3>Savings History</h3>
      <ul>
        {transactions.map((tx, idx) => (
          <li key={idx} style={{marginBottom: '8px'}}>
            <span style={{ fontWeight: 500, color: tx.type === 'add' ? '#FBC02D' : '#E65100' }}>
              {tx.type === 'add' ? '+' : '-'}¥{tx.amount.toFixed(2)}
            </span>{" "}
            <span style={{color: '#FFF9C4', fontSize: '0.9em'}}>{tx.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// PUBLIC_INTERFACE
function GoalProgress({ goal, balance, onSetGoal }) {
  /** Displays and updates savings goal progress */
  const [localGoal, setLocalGoal] = useState(goal || '');
  const progress = goal ? Math.min(1, balance / goal) : 0;
  return (
    <div className="goal-progress" aria-label="Goal Progress">
      <div style={{marginBottom: '0.5em'}}>
        <strong>Goal:</strong>{" "}
        {goal ? `¥${goal.toFixed(2)}` : 'No goal set.'}
      </div>
      <div style={{height: 14, background: '#222', borderRadius: 7, overflow: 'hidden', margin: '0.5em 0', width: '100%', maxWidth: 350}}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #FBC02D 60%, #E65100)',
            transition: 'width 0.4s',
          }}
        ></div>
      </div>
      {goal ? (
        <div style={{marginBottom: 12}}>
          <span style={{color: '#FFD600'}}>{(progress * 100).toFixed(0)}%</span> of goal reached!
        </div>
      ) : null}
      <form
        onSubmit={e => {
          e.preventDefault();
          const g = parseFloat(localGoal);
          if (g > 0) {
            onSetGoal(g);
          }
        }}
        style={{ display: 'flex', gap: 8, alignItems: 'center' }}
        aria-label="Set/Edit Goal"
      >
        <input
          type="number"
          min="0.01"
          step="0.01"
          required
          placeholder="Set goal…"
          aria-label="Savings Goal"
          value={localGoal}
          onChange={e => setLocalGoal(e.target.value)}
        />
        <button className="btn" type="submit">{goal ? 'Edit' : 'Set'} Goal</button>
        {goal && (
          <button
            className="btn"
            style={{background: '#444'}}
            type="button"
            onClick={() => { setLocalGoal(''); onSetGoal(null); }}
          >
            Reset
          </button>
        )}
      </form>
    </div>
  );
}

// PUBLIC_INTERFACE
function MotivationBanner({ message }) {
  /** Displays a motivational message */
  return (
    <div className="motivation-banner" aria-label="Motivational Message"
      style={{
        background: 'linear-gradient(90deg, var(--kavia-orange), #FFF9C4)',
        color: '#1A1A1A',
        borderRadius: 8,
        padding: '12px 20px',
        margin: '16px 0',
        fontWeight: 500,
        fontSize: '1.15rem',
        textAlign: 'center',
        minHeight: 40
      }}>
      {message}
    </div>
  );
}

/* --- Main PiggyHabit App Container --- */

// PUBLIC_INTERFACE
function App() {
  /**
   * Main container for PiggyHabit savings app
   * Maintains local state: balance, transactions, goal, motivation
   */
  // State variables
  const [balance, setBalance] = useState(0.0);
  const [transactions, setTransactions] = useState([]);
  const [goal, setGoal] = useState(null);
  const [motivationIdx, setMotivationIdx] = useState(0);

  // Motivational message pool (MVP: small, simple)
  const motivationalMessages = [
    "Save a little today, succeed a lot tomorrow!",
    "Every coin counts—good job!",
    "Building your habit, one step at a time.",
    "Stay consistent—future you will thank you!",
    "Keep going! You’re closer to your goal every day.",
  ];

  // Handler for adding savings
  function handleAdd(amount) {
    const now = new Date();
    setBalance(bal => bal + amount);
    setTransactions(list => [
      { type: 'add', amount, timestamp: now.toLocaleString() },
      ...list,
    ]);
    setMotivationIdx(idx => (idx + 1) % motivationalMessages.length);
  }

  // Handler for withdrawing savings
  function handleWithdraw(amount) {
    const now = new Date();
    setBalance(bal => Math.max(0, bal - amount));
    setTransactions(list => [
      { type: 'withdraw', amount, timestamp: now.toLocaleString() },
      ...list,
    ]);
    setMotivationIdx(idx => (idx + 1) % motivationalMessages.length);
  }

  // Handler for setting goal
  function handleSetGoal(newGoal) {
    setGoal(newGoal);
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="logo">
            <span className="logo-symbol" role="img" aria-label="Piggy">🐷</span> PiggyHabit
          </div>
        </div>
      </nav>

      {/* Main App Container */}
      <main style={{ marginTop: 90 }}>
        <div className="container" style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 32 }}>
          <MotivationBanner message={motivationalMessages[motivationIdx]} />

          {/* PiggyBank graphic visual */}
          <PiggyBankGraphic />

          {/* Balance display visual */}
          <BalanceDisplay balance={balance} />

          {/* Add & Withdraw Forms */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', margin: '18px 0 0', flexWrap: 'wrap' }}>
            <AddSavingsForm onAdd={handleAdd} />
            <WithdrawSavingsForm balance={balance} onWithdraw={handleWithdraw} />
          </div>

          {/* Savings Goal Progress */}
          <div style={{ margin: '2em 0 1.5em' }}>
            <GoalProgress goal={goal} balance={balance} onSetGoal={handleSetGoal} />
          </div>

          {/* Savings History List */}
          <section style={{ margin: '1.5em 0 0', borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
            <HistoryList transactions={transactions} />
          </section>
        </div>
      </main>
    </div>
  );
}

// Export all subcomponents for testing, development, or future composition
export {
  App as default,
  BalanceDisplay,
  PiggyBankGraphic,
  AddSavingsForm,
  WithdrawSavingsForm,
  HistoryList,
  GoalProgress,
  MotivationBanner,
};
