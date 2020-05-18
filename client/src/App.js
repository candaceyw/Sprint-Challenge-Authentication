import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
import Jokes from './components/Jokes';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
	return (
		<div className='App'>
			<div className='navbar bg-primary'>
				<li>
					<Link to='/jokes'>Home</Link>
				</li>
				<li>
					<Link to='/register'>Register</Link>
				</li>
				<li>
					<Link to='/login'>Login</Link>
				</li>
			</div>
			<Switch>
				<Route
					exact
					path='/jokes'
					render={(props) => {
						return <Jokes {...props} />;
					}}
				/>
				<Route
					path='/login'
					render={(props) => {
						return <Login {...props} />;
					}}
				/>
				<Route
					path='/register'
					render={(props) => {
						return <Register {...props} m />;
					}}
				/>
			</Switch>
		</div>
	);
}

export default App;
