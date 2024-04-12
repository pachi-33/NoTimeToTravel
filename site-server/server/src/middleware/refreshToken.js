const jwt = require('jsonwebtoken');
const privateKey = require('../config/privateKey');

const refreshToken = (req, res, next) => {
    const { openid, session_key } = req.data;
    if (!req.originalUrl.startsWith('/api/nofresh')) {
        next();
    }
    const freshToken = jwt.sign(
        { openid, session_key }, 
        privateKey, 
        { algorithm: 'HS256', expiresIn: '24h'}
    );
    res.data = {
        ...res.data,
        freshToken
    }
    next();
};

module.exports = { refreshToken };
