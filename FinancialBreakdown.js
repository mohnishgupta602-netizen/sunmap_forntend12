import React from 'react';
const FinancialBreakdown = ({ cost, subsidy, tariff, netCost }) => (
  <div className="financial-card-group">
    <div className="financial-card">
      <h4>Electric Tariff</h4>
      <p>Your current rate:</p>
      <strong className="value-highlight">{tariff}</strong>
    </div>
    <div className="financial-card">
      <h4>Estimated Panel Cost</h4>
      <p>System Cost (before subsidy):</p>
      <strong className="value-original">{cost}</strong>
    </div>
    <div className="financial-card subsidy-card">
      <h4>Government Subsidy</h4>
      <p>Applicable incentive amount:</p>
      <strong className="value-subsidy">-{subsidy}</strong>
    </div>
    <div className="financial-card final-cost">
      <h4>Net Installation Cost</h4>
      <p>Your total out-of-pocket expense:</p>
      <strong className="value-final">{netCost}</strong>
    </div>
  </div>
);
export default FinancialBreakdown;