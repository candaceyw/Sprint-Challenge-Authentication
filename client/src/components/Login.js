import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const Authenticate = (props) => {
	const history = useHistory();
	const [inputField, setInputField] = useState({
		username: '',
		password: '',
	});

	const changeHandler = (e) => {
		setInputField({ ...inputField, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:3300/api/auth/login', inputField)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', JSON.stringify(res.data.users));
				console.log(res.data);
			})
			.then(history.push('/jokes'))

			.catch((err) => {
				console.log('err', err);
			});
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='username'>Username</label>
					<input
						id='username'
						type='text'
						name='username'
						value={inputField.username}
						onChange={changeHandler}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						name='password'
						value={inputField.password}
						onChange={changeHandler}
						required
					/>
				</div>
				<input
					type='submit'
					value='Login'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Authenticate;
