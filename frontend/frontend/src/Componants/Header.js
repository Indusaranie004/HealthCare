import React from 'react';
import '../Styles/Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">Healtcare</div>
        <nav className="nav">
          <a href="/unsettled-bills" className="nav-link">Bills</a>
          <a href="/choose/0" className="nav-link">Payments</a>
          <a href="/login" className="nav-link">Login</a>
        </nav>
      </div>
    </header>
  );
}


