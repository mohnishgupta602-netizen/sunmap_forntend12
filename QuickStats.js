import React from 'react';
// Assuming a simple Card component from a UI library or custom CSS
const QuickStats = ({ generation, panelSize }) => (
  <div className="quick-stats-grid">
    <div className="stat-card">
      <p className="stat-label">Estimated Yearly Generation 💡</p>
      <p className="stat-value">{generation}</p>
    </div>
    <div className="stat-card">
      <p className="stat-label">Recommended System Size 📏</p>
      <p className="stat-value">{panelSize}</p>
    </div>
  </div>
);
export default QuickStats;