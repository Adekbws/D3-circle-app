import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const mountingPoint = document.createElement('div');
mountingPoint.className = 'react-app';
document.body.appendChild(mountingPoint);

ReactDOM.render(<App/>, mountingPoint);


