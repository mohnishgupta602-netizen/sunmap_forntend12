// This file is a self-contained app (no module imports), using React from the global UMD scripts.

function LocationInput({ onSubmit, disabled }) {
  const [location, setLocation] = React.useState('');
  const [roofArea, setRoofArea] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, roofArea });
  };

  return (
    <form className="location-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="City or PIN"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        disabled={disabled}
        required
      />
      <input
        type="number"
        placeholder="Roof area (m²)"
        value={roofArea}
        onChange={(e) => setRoofArea(e.target.value)}
        min="0"
        step="1"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>Calculate</button>
    </form>
  );
}

function getMeterColor(potentialScore) {
  if (potentialScore >= 75) return 'var(--color-high)';
  if (potentialScore >= 40) return 'var(--color-medium)';
  return 'var(--color-low)';
}

function SolarMeter({ score, potentialText }) {
  const color = getMeterColor(score);
  const rotation = (score / 100) * 180 - 90;

  return (
    <div className="solar-meter-container">
      <h3>Solar Potential Score</h3>
      <div className="gauge-circle">
        <div 
          className="gauge-needle" 
          style={{ 
            transform: `rotate(${rotation}deg)`,
            color: color
          }}
        ></div>
        <div className="gauge-center-value" style={{ color: color }}>
          {score} / 100
        </div>
      </div>
      <p className="potential-summary" style={{ color: color }}>
        {potentialText}
      </p>
    </div>
  );
}

function QuickStats({ generation, panelSize }) {
  return (
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
}

function FinancialBreakdown({ cost, subsidy, tariff, netCost }) {
  return (
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
}

function App() {
  const initialResults = {
    score: 0,
    text: 'Enter your details to calculate potential.',
    generation: '0 kWh/yr',
    panelSize: '0 kW',
    estimatedCost: '₹ 0',
    subsidy: '₹ 0',
    tariff: '₹ 0.00/kWh'
  };

  const [results, setResults] = React.useState(initialResults);
  const [loading, setLoading] = React.useState(false);

  const calculatePotential = () => {
    setLoading(true);
    const simulatedPotential = Math.floor(Math.random() * (95 - 20 + 1) + 20);
    const summary = simulatedPotential >= 75 ? 'Excellent Solar Potential! ☀️' :
                    simulatedPotential >= 40 ? 'Good Potential. Worth exploring.' :
                    'Low Potential. Requires a detailed survey.';

    const panelKW = (simulatedPotential / 100) * 5;
    const costBeforeSubsidy = panelKW * 75000;
    const subsidyAmount = panelKW >= 3 ? 78000 : panelKW > 0 ? 30000 : 0;

    setTimeout(() => {
      setResults({
        score: simulatedPotential,
        text: summary,
        generation: `${(panelKW * 1400).toFixed(0)} kWh/yr`,
        panelSize: `${panelKW.toFixed(2)} kW`,
        estimatedCost: `₹ ${(costBeforeSubsidy).toLocaleString('en-IN')}`,
        subsidy: `₹ ${(subsidyAmount).toLocaleString('en-IN')}`,
        tariff: '₹ 8.50/kWh (Residential Average)'
      });
      setLoading(false);
    }, 800);
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
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


