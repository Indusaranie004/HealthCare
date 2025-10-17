import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/SettleBill.css';

function SettleBill() {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bill, setBill] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        if (!billId) {
          throw new Error('Bill id missing');
        }
        const res = await fetch(`http://localhost:8080/api/bills/${encodeURIComponent(billId)}`, {
          headers: { 'Accept': 'application/json' }
        });
        const text = await res.text();
        let data; try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
        if (!res.ok) {
          throw new Error(data?.message || text || `HTTP ${res.status}`);
        }
        if (!isMounted) return;
        setBill(data);
      } catch (e) {
        if (!isMounted) return;
        setError(e.message || 'Failed to load bill');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [billId]);

  return (
    <div className="settle-container">
      <div className="settle-header">
        <h2>Settle Bill</h2>
        <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && bill && (
        <div className="settle-card">
          <div className="settle-row">
            <div className="settle-col">
              <div className="settle-label">Bill ID</div>
              <div className="settle-value">#{bill.billId ?? bill.id}</div>
            </div>
            <div className="settle-col">
              <div className="settle-label">Issued</div>
              <div className="settle-value">{bill.issuedAt ? new Date(bill.issuedAt).toLocaleDateString() : '—'}</div>
            </div>
            <div className="settle-col">
              <div className="settle-label">Amount</div>
              <div className="settle-amount">{Number(bill.amount || 0).toLocaleString()}</div>
            </div>
          </div>

          <div className="settle-section">
            <div className="settle-section-title">Hospital</div>
            <div className="settle-hospital">
              <div className="settle-h-name">{bill?.hospital?.name || '—'}</div>
              <div className="settle-h-loc">{bill?.hospital?.location || '—'}</div>
            </div>
          </div>

          <div className="settle-section">
            <div className="settle-section-title">Items</div>
            <ul className="settle-items">
              {(bill.items || []).map((it, idx) => (
                <li key={idx} className="settle-item">
                  <div className="item-name">{it?.healthcareService?.serviceName || 'Service'}</div>
                  <div className="item-meta">x{it?.quantity || 1}</div>
                  <div className="item-price">{Number(it?.amount || it?.healthcareService?.price || 0).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="settle-actions">
            <button
              className="btn-primary"
              onClick={async () => {
                try {
                  const isGovernment = !!bill?.hospital && (bill.hospital.type === 'Government' || bill.hospital.type === 'government');
                  const id = bill?.billId || bill?.id;
                  if (!id) throw new Error('Bill id missing');
                  if (isGovernment) {
                    // Redirect to government form with prefilled amount
                    navigate(`/settle/${id}/government`, { state: { amount: bill?.amount } });
                    return;
                  }
                  // Non-government: let user choose payment method
                  navigate(`/choose/${id}`, { state: { amount: bill?.amount } });
                } catch (e) {
                  alert(e.message || 'Payment failed');
                }
              }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettleBill;


