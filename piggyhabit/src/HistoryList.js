import React from "react";

// PUBLIC_INTERFACE
function HistoryList({ transactions }) {
  /**
   * Displays a scrollable list of all addition and withdrawal transactions.
   * Each entry shows type, amount, and timestamp.
   */
  if (!transactions.length) {
    return (
      <div className="history-list" aria-label="No Transactions">
        <div style={{ color: "#FFF9C4", opacity: 0.9, textAlign: "center", padding: "2em 0" }}>
          No savings or withdrawals yet.
        </div>
      </div>
    );
  }
  return (
    <div className="history-list" aria-label="Savings History" style={{
      maxHeight: 340,
      overflowY: "auto",
      borderRadius: 8,
      background: "#232323",
      border: "1px solid var(--border-color)",
      padding: "16px 8px",
      margin: "0 auto",
      boxShadow: "0 2px 16px rgba(0,0,0,0.12)"
    }}>
      <h3 style={{ color: "#FFD600", margin: "0 0 12px", fontWeight: 600, letterSpacing: 0.5 }}>Savings History</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {transactions.map((tx, idx) => (
          <li key={idx} style={{
            display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #292929",
            padding: "8px 0", fontSize: "1.05em"
          }}>
            <span style={{
              fontWeight: 500,
              color: tx.type === 'add' ? '#FBC02D' : '#E65100',
              minWidth: 56,
              display: "inline-block"
            }}>
              {tx.type === "add" ? "+" : "-"}¥{tx.amount.toFixed(2)}
            </span>
            <span style={{
              color: '#FFF9C4',
              fontSize: '0.95em',
              opacity: 0.85,
              flex: 1
            }}>
              {tx.timestamp}
            </span>
            <span
              style={{
                fontSize: 11,
                background: tx.type === "add" ? "#259d32" : "#9d2525",
                color: "#fff",
                borderRadius: 4,
                padding: "2px 8px",
                textTransform: "uppercase",
                letterSpacing: 0.5
              }}>
              {tx.type === "add" ? "SAVED" : "WITHDRAW"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
