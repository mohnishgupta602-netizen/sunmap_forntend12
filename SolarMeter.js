import React from 'react';
// Assuming a library component like 'react-gauge-component' or custom SVG
import './SolarMeter.css'; // For custom styling of the meter

const getMeterColor = (potentialScore) => {
  if (potentialScore >= 75) return 'var(--color-high)'; // Green/Yellow
  if (potentialScore >= 40) return 'var(--color-medium)'; // Orange
  return 'var(--color-low)'; // Red
};

const SolarMeter = ({ score, potentialText }) => {
  const color = getMeterColor(score);
  const rotation = (score / 100) * 180 - 90; // Rotate from -90deg (0%) to 90deg (100%) for a half-circle

  return (
    <div className="solar-meter-container">
      <h3>Solar Potential Score</h3>
      <div className="gauge-circle">
        {/* The semi-circle arc/needle visualization */}
        <div 
          className="gauge-needle" 
          style={{ 
            transform: `rotate(${rotation}deg)`,
            borderColor: color // Color the needle or surrounding track
          }}
        ></div>
        <div className="gauge-center-value" style={{ color: color }}>
          {score} / 100
        </div>
      </div>
      <p className="potential-summary" style={{ color: color }}>
        **{potentialText}**
      </p>
    </div>
  );
};

export default SolarMeter;

// Example CSS Variables for a custom meter (in SolarMeter.css)
// :root {
//   --color-high: #38c172; /* Green */
//   --color-medium: #f6993f; /* Orange */
//   --color-low: #e3342f; /* Red */
// }