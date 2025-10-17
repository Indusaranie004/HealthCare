// App.js (UPDATED)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnsettledBills from './Componants/UnsettledBills';
import SettleBill from './Componants/SettleBill';
import GovernmentForm from './Componants/GovernmentForm';
import Receipt from './Componants/Receipt';
import ChoosePayment from './Componants/ChoosePayment';
import InsuranceForm from './Componants/InsuranceForm';
import CardForm from './Componants/CardForm';
import Login from './Componants/Login';
import './App.css';
import Header from './Componants/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unsettled-bills" element={<UnsettledBills />} />
          <Route path="/settle/:billId" element={<SettleBill />} />
          <Route path="/settle/:billId/government" element={<GovernmentForm />} />
          <Route path="/choose/:billId" element={<ChoosePayment />} />
          <Route path="/choose/:billId/insurance" element={<InsuranceForm />} />
          <Route path="/choose/:billId/card" element={<CardForm />} />
          <Route path="/receipt/:paymentId" element={<Receipt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;