exports.seed = async function (knex) {
	await knex('users').truncate();
	await knex('users').insert([{ username: 'Joe', password: 'abc123' }]);
};
