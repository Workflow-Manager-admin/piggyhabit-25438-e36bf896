import React, { useState } from 'react';
import './App.css';

import BalanceDisplay from "./BalanceDisplay";
import PiggyBankGraphic from "./PiggyBankGraphic";
import AddSavingsForm from "./AddSavingsForm";
import WithdrawSavingsForm from "./WithdrawSavingsForm";
import HistoryList from "./HistoryList";
import GoalProgress from "./GoalProgress";

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
  // State for tab/pane: 'main' or 'history'
  const [view, setView] = useState('main');

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

  // Simple segmented control for tabs
  const mainTabColor = view === "main" ? "var(--kavia-orange)" : "rgba(255,255,255,0.04)";
  const historyTabColor = view === "history" ? "var(--kavia-orange)" : "rgba(255,255,255,0.04)";

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

      {/* Tabs control */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 0,
        marginTop: 80, marginBottom: 12
      }}>
        <button
          className="btn"
          aria-label="Main view"
          style={{
            borderRadius: "10px 0 0 10px",
            background: mainTabColor,
            color: view === "main" ? "#1A1A1A" : "var(--text-secondary)",
            borderRight: "1px solid var(--border-color)",
            minWidth: 90,
            transition: "all 0.19s",
            fontWeight: view === "main" ? 700 : 400,
          }}
          onClick={() => setView('main')}
        >
          Main
        </button>
        <button
          className="btn"
          aria-label="View savings history"
          style={{
            borderRadius: "0 10px 10px 0",
            background: historyTabColor,
            color: view === "history" ? "#1A1A1A" : "var(--text-secondary)",
            borderLeft: "1px solid var(--border-color)",
            minWidth: 90,
            transition: "all 0.19s",
            fontWeight: view === "history" ? 700 : 400,
          }}
          onClick={() => setView('history')}
        >
          History
        </button>
      </div>

      <main style={{ marginTop: 16 }}>
        <div className="container" style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 32 }}>
          {view === "main" && (
            <>
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
            </>
          )}

          {view === "history" && (
            <section aria-label="Savings History" style={{
              borderTop: '1px solid var(--border-color)', paddingTop: 20, marginTop: 12
            }}>
              <HistoryList transactions={transactions} />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export {
  App as default,
  MotivationBanner,
};
