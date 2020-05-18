import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';

import axios from 'axios';

const Jokes = ({ data }) => {
	const [loggedIn, setLoginState] = useState(false);
	const [jokes, setJokes] = useState([]);
	const history = useHistory();

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('userToken'),
		},
		withCredentials: true,
	};

	useEffect(() => {
		axios
			.get(`http://localhost:3300/api/auth/jokes`, config, {
				withCredentials: true,
			})
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				setAuthToken(localStorage.token);

				setJokes(response.data);
				setLoginState(true);
			})
			.catch(() => {
				history.push('/jokes');
			});
	}, [history]);

	return (
		<div className='jokes'>
			<h2>Jokes</h2>
			<ul>
				{jokes.map((joke) => {
					return <li key={joke.id}>{joke.joke}</li>;
				})}
			</ul>
		</div>
	);
};

export default Jokes;
