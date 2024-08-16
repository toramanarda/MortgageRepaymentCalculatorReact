import React, { useState } from 'react';
import percentage from './img/percentage.png';
import calculator from './img/calculator.png';
import emptyResults from './img/emptyResults.png';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [years, setYears] = useState(0);
  const [rate, setRate] = useState(0);
  const [mortgageType, setMortgageType] = useState('repayment');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  const calculateMortgage = () => {
    let kredi = Number(amount);
    let yfaiz = Number(rate);
    let afaiz = (yfaiz / 100) / 12;
    let taysayi = Number(years) * 12;

    let aylikOdeme = (kredi * (afaiz) * ((1 + afaiz) ** taysayi)) / (((1 + afaiz) ** taysayi) - 1);
    let toplamOdeme = aylikOdeme * 12 * years;

    setMonthlyPayment(aylikOdeme.toFixed(2));
    setTotalRepayment(toplamOdeme.toFixed(2));
  };

  const clearAll = () => {
    setAmount(0);
    setYears(0);
    setRate(0);
    setMortgageType('repayment');
    setMonthlyPayment(null);
    setTotalRepayment(null);
  };

  return (
    <div className="container">
      <div className="InfoArea">
        <Header onClear={clearAll} />
        <div className="inputArea">
          <Amount value={amount} onChange={setAmount} />
          <YearsPercantageInput
            years={years}
            onYearsChange={setYears}
            rate={rate}
            onRateChange={setRate}
          />
          <MortgageType
            selectedType={mortgageType}
            onChange={setMortgageType}
          />
          <CalculatorButton onClick={calculateMortgage} />
        </div>
      </div>
      <ResultsArea
        monthlyPayment={monthlyPayment}
        totalRepayment={totalRepayment}
      />
    </div>
  );
}

function Header({ onClear }) {
  return (
    <div className="header">
      <h1>Mortgage Calculator</h1>
      <a href="#" className="ClearAllBtn" onClick={onClear}>
        Clear All
      </a>
    </div>
  );
}

function Amount({ value, onChange }) {
  return (
    <div className="amount">
      <h5>Mortgage Amount</h5>
      <span className="currency-symbol">£</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

function YearsPercantageInput({ years, onYearsChange, rate, onRateChange }) {
  return (
    <div className="yearsPercantageInput">
      <div className="years">
        <h5>Mortgage Term</h5>
        <span className="currency-symbol">years</span>
        <input
          type="number"
          value={years}
          onChange={(e) => onYearsChange(parseFloat(e.target.value))}
        />
      </div>
      <div className="percantage">
        <h5>Interest Rate</h5>
        <span className="currency-symbol">%</span>
        <input
          type="number"
          value={rate}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

function MortgageType({ selectedType, onChange }) {
  return (
    <form className="MortgageType">
      <div className="radio-group">
        <label>
          <input
            type="radio"
            checked={selectedType === 'repayment'}
            onChange={() => onChange('repayment')}
          />{' '}
          Repayment
        </label>
      </div>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            checked={selectedType === 'interestOnly'}
            onChange={() => onChange('interestOnly')}
          />{' '}
          Interest Only
        </label>
      </div>
    </form>
  );
}

function CalculatorButton({ onClick }) {
  return (
    <button className="CalculatorBtn" onClick={onClick}>
      <img src={calculator} alt="Calculate" /> Calculate Repayments
    </button>
  );
}

function ResultsArea({ monthlyPayment, totalRepayment }) {
  return (
    <div className="resultsArea ">
      {monthlyPayment !== null && totalRepayment !== null ? (
        <>
          <div className="showResult">
            <h3 className='resultFilled'>Your results</h3>
            <p className='resultpFilled'>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div className="resultPayment">
              <h3>Your monthly repayments</h3>
              <p className='monthlyPayment'>£{monthlyPayment}</p>
              <hr />
              <h3>Total you'll repay over the term</h3>
              <p className='totalR'>£{totalRepayment}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={emptyResults} alt="Empty Results" />
          <h3>Results shown here</h3>
          <p>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </>
      )}
    </div>
  );
}

export default App;
