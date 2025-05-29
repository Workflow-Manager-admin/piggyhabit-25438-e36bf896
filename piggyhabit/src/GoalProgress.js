import React, { useState } from "react";

/**
 * GoalProgress - component for savings goal input, edit and progress display
 */
// PUBLIC_INTERFACE
function GoalProgress({ goal, balance, onSetGoal }) {
  /** 
   * Displays and updates savings goal progress.
   * Features:
   * - Shows numeric goal, percentage, and a progress bar.
   * - Allows editing or resetting the goal.
   * - Calls onSetGoal(newGoal) when user sets or edits the goal.
   */
  const [localGoal, setLocalGoal] = useState(goal ?? "");
  const progress = goal ? Math.min(1, balance / goal) : 0;

  return (
    <div className="goal-progress" aria-label="Goal Progress">
      <div style={{ marginBottom: "0.5em" }}>
        <strong>Goal:</strong>&nbsp;
        {goal ? `¥${goal.toFixed(2)}` : "No goal set."}
      </div>
      <div style={{
        height: 14,
        background: "#222",
        borderRadius: 7,
        overflow: "hidden",
        margin: "0.5em 0",
        width: "100%",
        maxWidth: 350
      }}>
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #FBC02D 60%, #E65100)",
            transition: "width 0.4s",
          }}
        />
      </div>
      {goal ? (
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: "#FFD600" }}>{(progress * 100).toFixed(0)}%</span> of goal reached!
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
        style={{ display: "flex", gap: 8, alignItems: "center" }}
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
        <button className="btn" type="submit">{goal ? "Edit" : "Set"} Goal</button>
        {goal && (
          <button
            className="btn"
            style={{ background: "#444" }}
            type="button"
            onClick={() => { setLocalGoal(""); onSetGoal(null); }}
          >
            Reset
          </button>
        )}
      </form>
    </div>
  );
}

export default GoalProgress;
