import React, { useState } from 'react';
import LocationInput from './LocationInput';
import SolarMeter from './SolarMeter';
import QuickStats from './QuickStats';
import FinancialBreakdown from './FinancialBreakdown';

const initialResults = {
  score: 0,
  text: "Enter your details to calculate potential.",
  generation: '0 kWh/yr',
  panelSize: '0 kW',
  estimatedCost: '₹ 0',
  subsidy: '₹ 0',
  tariff: '₹ 0.00/kWh'
};

const SolarCalculator = () => {
  const [results, setResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);

  // Placeholder for the actual calculation logic 
  // (In a real app, this would be an API call to a backend service)
  const calculatePotential = (locationData) => {
    setLoading(true);
    // Dummy Calculation Logic (Simulating Sun Ray Calculation/API)
    const simulatedPotential = Math.floor(Math.random() * (95 - 20 + 1) + 20); 
    const summary = simulatedPotential >= 75 ? "Excellent Solar Potential! ☀️" : 
                    simulatedPotential >= 40 ? "Good Potential. Worth exploring." : 
                    "Low Potential. Requires a detailed survey.";

    // Dummy Financial Data based on potential
    const panelKW = (simulatedPotential / 100) * 5; // e.g., max 5kW system
    const costBeforeSubsidy = panelKW * 75000; // Rs 75,000 per kW (example)
    const subsidyAmount = panelKW >= 3 ? 78000 : panelKW > 0 ? 30000 : 0; // Example subsidy slab

    setTimeout(() => {
      setResults({
        score: simulatedPotential,
        text: summary,
        generation: `${(panelKW * 1400).toFixed(0)} kWh/yr`, // Example: 1400 kWh per kW per year
        panelSize: `${panelKW.toFixed(2)} kW`,
        estimatedCost: `₹ ${(costBeforeSubsidy).toLocaleString('en-IN')}`,
        subsidy: `₹ ${(subsidyAmount).toLocaleString('en-IN')}`,
        tariff: '₹ 8.50/kWh (Residential Average)' // Example Tariff
      });
      setLoading(false);
    }, 1500); // Simulate API call delay
  };

  return (
    <div className="sunmap-container">
      <h1>sunMAP: Solar Energy Potential Analyzer ⚡</h1>
      
      <LocationInput onSubmit={calculatePotential} disabled={loading} />

      <hr />

      {loading ? (
        <p className="loading-state">Calculating your sun potential... </p>
      ) : (
        <div className="results-dashboard">
          <div className="potential-visuals">
            <SolarMeter score={results.score} potentialText={results.text} />
            <QuickStats generation={results.generation} panelSize={results.panelSize} />
          </div>

          <h2>Financial Feasibility</h2>
          <FinancialBreakdown 
            cost={results.estimatedCost}
            subsidy={results.subsidy}
            tariff={results.tariff}
            netCost={`₹ ${(parseFloat(results.estimatedCost.replace(/[^0-9.]/g, '')) - parseFloat(results.subsidy.replace(/[^0-9.]/g, ''))).toLocaleString('en-IN')}`}
          />
        </div>
      )}
    </div>
  );
};

export default SolarCalculator;