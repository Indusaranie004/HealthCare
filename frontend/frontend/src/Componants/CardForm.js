import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../Styles/CardForm.css';

function CardForm() {
  const { billId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const a = location?.state?.amount;
    if (a != null) setAmount(String(Number(a)));
    if (a == null) {
      (async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/bills/${encodeURIComponent(billId)}`, { headers: { 'Accept': 'application/json' } });
          const text = await res.text(); let data; try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
          if (res.ok && data?.amount != null) setAmount(String(Number(data.amount)));
        } catch (_) {}
      })();
    }
  }, [billId, location]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!cardNumber || !expiryDate || !cvv) { setError('All fields are required'); return; }
    setLoading(true);
    try {
      const payload = {
        billId: String(billId),
        paymentType: 'card',
        amount: Number(amount),
        cardNumber,
        expiryDate,
        cvv
      };
      const res = await fetch('http://localhost:8080/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const text = await res.text(); let data; try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
      if (!res.ok || !data?.success) throw new Error(data?.message || text || 'Payment failed');
      const receipt = data.receipt; navigate(`/receipt/${receipt?.receiptId}`, { state: { receipt } });
    } catch (e) {
      setError(e.message || 'Payment failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="cardpay-container">
      <div className="cardpay-header">
        <h2>Card Payment</h2>
        <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
      {error && <div className="error">{error}</div>}
      <form className="cardpay-form" onSubmit={submit}>
        <div className="form-row"><label>Amount</label><input value={amount} onChange={e => setAmount(e.target.value)} /></div>
        <div className="form-row"><label>Card Number</label><input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4111111111111111" /></div>
        <div className="form-row"><label>Expiry (MM/YY)</label><input value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder="12/28" /></div>
        <div className="form-row"><label>CVV</label><input value={cvv} onChange={e => setCvv(e.target.value)} placeholder="123" /></div>
        <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Processing…' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default CardForm;


