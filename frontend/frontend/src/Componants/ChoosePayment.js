import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../Styles/ChoosePayment.css';

function ChoosePayment() {
  const { billId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location?.state?.amount;

  return (
    <div className="choose-container">
      <div className="choose-header">
        <h2>Choose Payment Method</h2>
        <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="choose-grid">
        <div className="choose-card">
          <div className="choose-title">Pay with Insurance</div>
          <div className="choose-desc">Claim against your insurance policy.</div>
          <button className="btn-primary" onClick={() => navigate(`/choose/${billId}/insurance`, { state: { amount } })}>Continue</button>
        </div>
        <div className="choose-card">
          <div className="choose-title">Pay with Card</div>
          <div className="choose-desc">Use debit or credit card.</div>
          <button className="btn-secondary" onClick={() => navigate(`/choose/${billId}/card`, { state: { amount } })}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default ChoosePayment;


