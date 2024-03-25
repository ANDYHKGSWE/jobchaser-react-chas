import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ErrorPage from './components/ErrorPage';
import SavedJobs from './components/SavedJobs';
import { AuthProvider, AuthContext } from './context/AuthContext';

const root = createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Router basename="/">
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<div>STARTSIDA</div>} />
					<Route path="/jobs" element={<App />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/savedjobs" element={<SavedJobs />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</AuthProvider>
		</Router>
	</React.StrictMode>
);
