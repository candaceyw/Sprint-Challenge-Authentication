import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Jokes = ({ data }) => {
	const [jokes, setJokes] = useState([]);
	const history = useHistory();

	const config = {
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token'),
		},
	};

	useEffect(() => {
		axios
			.get(`http://localhost:3300/api/auth/jokes`, config)
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				setJokes(response.data);
				history.push('/');
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
