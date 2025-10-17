import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../Styles/InsuranceForm.css';

function InsuranceForm() {
  const { billId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [insurer, setInsurer] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimDate, setClaimDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [policies, setPolicies] = useState([]);
  const INSURERS = ['AIA', 'Ceylinco', 'Allianz', 'Union Assurance'];
  const normalize = (s) => (s || '').toString().toLowerCase().replace(/\s+/g, '');

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
    // Initialize claim date to today (yyyy-MM-dd) and keep in sync
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    setClaimDate(`${yyyy}-${mm}-${dd}`);
    // Load patient insurance policies to auto-fill policy number
    const patientId = localStorage.getItem('patientId');
    if (patientId) {
      (async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/insurance/patient/${encodeURIComponent(patientId)}`, { headers: { 'Accept': 'application/json' } });
          const text = await res.text(); let data; try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
          if (res.ok && Array.isArray(data)) setPolicies(data);
        } catch (_) {}
      })();
    }
  }, [billId, location]);

  // When insurer changes, auto-select policy number from fetched policies
  useEffect(() => {
    if (!insurer || policies.length === 0) return;
    // Handle spelling variations (e.g., Alianz -> Allianz)
    const wanted = normalize(insurer).replace('alianz', 'allianz');
    const filtered = policies.filter(p => normalize(p?.insurer) === wanted || normalize(p?.insurer).includes(wanted) || wanted.includes(normalize(p?.insurer)));
    const first = filtered[0];
    setPolicyNumber(first?.policyNumber || '');
  }, [insurer, policies]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!insurer || !policyNumber || !claimDate) { setError('All fields are required'); return; }
    setLoading(true);
    try {
      const generatedClaimId = Math.floor(Date.now() % 1000000000);
      const payload = {
        billId: String(billId),
        paymentType: 'insurance',
        insurer,
        policyNumber,
        claimId: generatedClaimId,
        claimAmount: Number(amount),
        claimDate: Math.floor(new Date(claimDate).getTime() / (1000 * 60 * 60 * 24)) // epoch day
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
    <div className="ins-container">
      <div className="ins-header">
        <h2>Insurance Payment</h2>
        <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
      {error && <div className="error">{error}</div>}
      <form className="ins-form" onSubmit={submit}>
        <div className="form-row"><label>Amount</label><input value={amount} onChange={e => setAmount(e.target.value)} /></div>
        <div className="form-row">
          <label>Insurer</label>
          <select value={insurer} onChange={e => setInsurer(e.target.value)}>
            <option value="" disabled>Select insurer</option>
            {INSURERS.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Policy Number</label>
          {(() => {
            const wanted = normalize(insurer).replace('alianz', 'allianz');
            const filtered = policies.filter(p => normalize(p?.insurer) === wanted || normalize(p?.insurer).includes(wanted) || wanted.includes(normalize(p?.insurer)));
            if (filtered.length <= 1) {
              return <input value={policyNumber} readOnly />;
            }
            return (
              <select value={policyNumber} onChange={e => setPolicyNumber(e.target.value)}>
                <option value="" disabled>Select policy</option>
                {filtered.map((p, i) => (
                  <option key={i} value={p.policyNumber}>{p.policyNumber}</option>
                ))}
              </select>
            );
          })()}
        </div>
        <div className="form-row"><label>Claim Date</label><input type="date" value={claimDate} readOnly /></div>
        <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Processing…' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default InsuranceForm;


