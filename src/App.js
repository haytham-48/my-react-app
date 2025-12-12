import React from 'react';
import Menu from './components/Menu';
import './App.css';

function Etudiant(props) {
  return (
    <div className="etudiant-card">
      <h2>Étudiant nom: {props.nom} a pour âge: {props.age}</h2>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Menu />
      <main className="main-content">
        <h1>Bienvenue sur MyReact</h1>
        <div className="students">
          <Etudiant nom="Rami" age={23} />
          <Etudiant nom="Karimi" age={21} />
        </div>
      </main>
    </div>
  );
}