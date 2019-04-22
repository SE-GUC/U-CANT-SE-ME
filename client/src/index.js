import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LawyerDashBoard from './components/DashBoard/LawyerDashBoard'
import InvestorDashBoard from './components/DashBoard/InvestorDashBoard'

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<InvestorDashBoard />, document.getElementById('root'));
ReactDOM.render(<LawyerDashBoard />, document.getElementById('root'));
// 