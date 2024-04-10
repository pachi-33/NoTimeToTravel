const jwt = require('jsonwebtoken');
const privateKey = require('../config/privateKey');

const sendAuthFailureResponse = (res, status, msg) => {
  res.status(status).json({ status, msg });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // 检查请求是否携带了 token
    if (!token) {
        return sendAuthFailureResponse(res, 401, 'Validation failed.');
    }

    // 验证 token
    jwt.verify(token, privateKey, { expiresIn: '24h' }, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return sendAuthFailureResponse(res, 401, 'Authentication expires.');
            }
        return sendAuthFailureResponse(res, 401, 'Validation failed.');
    }

    req.data = {
        ...req.data,
        decoded
    };
    next();
    });
};

module.exports = { verifyToken };
