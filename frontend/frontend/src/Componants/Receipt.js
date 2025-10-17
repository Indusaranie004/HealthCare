import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../Styles/Receipt.css';

function Receipt() {
  const { paymentId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const receipt = state?.receipt;

  const download = () => {
    const id = receipt?.receiptId || paymentId;
    if (id) {
      const a = document.createElement('a');
      a.href = `http://localhost:8080/api/payments/receipt/${id}/download`;
      a.download = `receipt-${id}.txt`;
      a.click();
    }
  };

  if (!receipt) {
    return (
      <div className="receipt-container">
        <div className="receipt-header">
          <h2>Receipt</h2>
          <button className="btn-secondary" onClick={() => navigate('/')}>Home</button>
        </div>
        <p>No receipt details available.</p>
      </div>
    );
  }

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <h2>Payment Successful</h2>
        <button className="btn-secondary" onClick={() => navigate('/')}>Home</button>
      </div>
      <div className="receipt-card">
        <div className="row"><span>Receipt ID</span><strong>{receipt.receiptId}</strong></div>
        <div className="row"><span>Bill ID</span><strong>{receipt.billId}</strong></div>
        <div className="row"><span>Status</span><strong>{receipt.status}</strong></div>
        <div className="row"><span>Method</span><strong>{receipt.method}</strong></div>
        <div className="row"><span>Amount</span><strong>{Number(receipt.amount || 0).toLocaleString()}</strong></div>
        <div className="row"><span>Paid At</span><strong>{receipt.paidAt ? new Date(receipt.paidAt).toLocaleDateString() : '—'}</strong></div>
        <div className="row"><span>Hospital</span><strong>{receipt.hospitalName} {receipt.hospitalLocation ? `(${receipt.hospitalLocation})` : ''}</strong></div>
      </div>
      <div className="receipt-actions">
        <button className="btn-primary" onClick={download}>Download Receipt</button>
      </div>
    </div>
  );
}

export default Receipt;


