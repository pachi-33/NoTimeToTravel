const myQuery = require('../utils/myQuery');
const runtimeLog = require('../utils/logger');

const User = {
    append: async function(username, password, auth){
        const sql = ` INSERT INTO users (username, password, auth) VALUES \
        ${username, password, auth};\
        `;
        try {
            const feedback = await myQuery(sql);
            console.log('Added a new user: ', feedback);
            runtimeLog.info('Added a new user: ',feedback);
        } catch(err) {
            console.log('Error when adding new user: ', err);
            runtimeLog.error(err);
        }
    },

    findAllByUsername: async function(username){
        const sql = ` SELECT * FROM users WHERE username = ? `;
        try {
            const rows = myQuery(sql, username);
            return rows;
        } catch(err) {
            console.log('Error when find user by username: ', err);
            runtimeLog.error(err);
        }
    }
}

module.exports = User;