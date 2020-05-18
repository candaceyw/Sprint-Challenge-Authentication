import React, { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [status, setStatus] = useState('normal');

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const payload = { username, password };

		setStatus('');
		axios
			.post('http://localhost:3300/api/auth/register', payload)
			.then(() => setStatus('Account created!'))
			.catch((err) => setStatus(err.response.data.message));
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
				{status && <p>{status}</p>}
			</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						id='username'
						type='text'
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength='6'
					/>
				</div>

				<input
					type='submit'
					value='Register'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Register;
