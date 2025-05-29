import React, { useState } from "react";

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

export default AddSavingsForm;
