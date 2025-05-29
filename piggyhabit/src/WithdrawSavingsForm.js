import React, { useState } from "react";

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

export default WithdrawSavingsForm;
