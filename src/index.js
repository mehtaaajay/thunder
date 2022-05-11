import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './style/index.css';

const container = document.getElementById('root');
const root = createRoot(container);

document.oncontextmenu = () => false;

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
