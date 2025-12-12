import React, { useState } from 'react';
import './Menu.css';

export default function Menu() {
  const [open, setOpen] = useState(false);

  const items = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'students', label: 'Students', icon: '🎓' },
    { key: 'about', label: 'About', icon: 'ℹ️' },
    { key: 'contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <nav className="menu">
      <div className="menu-left">
        <div className="logo">MyReact<span className="dot">.</span></div>
      </div>

      <ul className={`menu-links ${open ? 'open' : ''}`}>
        {items.map((it) => (
          <li key={it.key} className="menu-item" onClick={() => setOpen(false)}>
            <span className="menu-icon" aria-hidden>{it.icon}</span>
            <span className="menu-label">{it.label}</span>
          </li>
        ))}
      </ul>

      <div className="menu-right">
        <button className={`hamburger ${open ? 'is-active' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
