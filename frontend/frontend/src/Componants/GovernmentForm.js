import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../Styles/GovernmentForm.css';

function GovernmentForm() {
  const { billId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [fundSource, setFundSource] = useState('National Health Fund');
  const [reqAmount, setReqAmount] = useState('');
  const [governmentId, setGovernmentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Prefill amount from navigation state when available
    const amt = location?.state?.amount;
    if (reqAmount === '' && (amt !== undefined && amt !== null)) {
      const normalized = typeof amt === 'object' && 'toString' in amt ? Number(amt) : Number(amt);
      if (!Number.isNaN(normalized)) setReqAmount(String(normalized));
    }
    // Fallback: fetch bill to prefill amount if state is missing
    if ((amt == null || amt === undefined) && reqAmount === '' && billId) {
      (async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/bills/${encodeURIComponent(billId)}`, { headers: { 'Accept': 'application/json' } });
          const text = await res.text();
          let data; try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
          if (res.ok && data) {
            const a = data.amount ?? data.total ?? data.billAmount;
            const normalized = Number(a);
            if (!Number.isNaN(normalized)) setReqAmount(String(normalized));
          }
        } catch (_) {
          // ignore, user can fill manually
        }
      })();
    }
  }, [location, reqAmount]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!billId) { setError('Invalid bill id'); return; }
    if (!fundSource || !reqAmount || !governmentId) { setError('All fields are required'); return; }
    // Validate Government ID: GOV followed by 6 digits
    if (!/^GOV\d{6}$/.test(governmentId)) { setError('Government ID must be in format GOV123456'); return; }
    setLoading(true);
    try {
      const payload = {
        billId: String(billId),
        paymentType: 'government',
        fundSource,
        reqAmount: Number(reqAmount),
        governmentId
      };
      const res = await fetch('http://localhost:8080/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const text = await res.text();
      let data; try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
      if (!res.ok || !data?.success) throw new Error(data?.message || text || 'Payment failed');
      const receipt = data.receipt;
      navigate(`/receipt/${receipt?.receiptId}`, { state: { receipt } });
    } catch (e) {
      setError(e.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gov-container">
      <div className="gov-header">
        <h2>Government Payment</h2>
        <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit} className="gov-form">
        <div className="form-row">
          <label>Fund Source</label>
          <input value={fundSource} onChange={(e) => setFundSource(e.target.value)} placeholder="e.g., National Health Fund" />
        </div>
        <div className="form-row">
          <label>Requested Amount</label>
          <input type="number" value={reqAmount} onChange={(e) => setReqAmount(e.target.value)} placeholder="0.00" />
        </div>
        <div className="form-row">
          <label>Government ID</label>
          <input value={governmentId} onChange={(e) => setGovernmentId(e.target.value)} placeholder="e.g., GOV-123456" />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing…' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default GovernmentForm;


