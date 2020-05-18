const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

module.exports = {
	find,
	findBy,
	findById,
	add,
};

function find() {
	return db('users').select('id', 'username');
}

function findById(id) {
	return db('users').where('id', id).first();
}

function findBy(filter) {
	return db('users').select('id', 'username', 'password').where(filter);
}

async function add(user) {
	// hash the password with a time complexity of 14
	user.password = await bcrypt.hash(user.password, 14);

	const [id] = await db('users').insert(user);
	return findById(id);
}
