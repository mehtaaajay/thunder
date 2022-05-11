import React, { useEffect } from 'react';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Settings from './pages/Settings';

import { 
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate
} from 'react-router-dom';

import './style/App.css';

const SendToHome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/chat');
	}, []);
}

const App = () => {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route exact path='/' element={<SendToHome />} />
					<Route exact path='/chat/*' element={<Home />} />
					<Route exact path='/auth' element={<Auth />} />
					<Route exact path='/settings/*' element={<Settings />} />
					<Route path='*' element={<h1> 404 </h1>} />
				</Routes>				
			</Router>
		</div>
	);
}

export default App;
