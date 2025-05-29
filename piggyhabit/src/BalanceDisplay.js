import React from "react";

// PUBLIC_INTERFACE
function BalanceDisplay({ balance = 0 }) {
  /**
   * Displays the user's current savings balance.
   * Placeholder/initial version for integration and layout only.
   */
  return (
    <div className="balance-display" aria-label="Current Balance">
      {/* TODO: Replace with styled display and content */}
      <h2 className="balance-title">Your Balance</h2>
      <div className="balance-amount">¥ {balance.toFixed ? balance.toFixed(2) : balance}</div>
    </div>
  );
}

export default BalanceDisplay;
