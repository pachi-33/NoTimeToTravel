const User = require('../../models/usersModel');
const runtimeLog = require('../../utils/logger');
const secretKey = require('../../config/secretKey');
const jwt = require('jsonwebtoken');

const validation = (username, password)=>{
    const users = User.findAllByUsername(username);
    return users.then((data) => {
        if(Object.keys(data).length==1 && data[0].password==password){
            return new Promise(resolve => resolve(data[0]));
        }else{
            return null;
        }
    })
}

const login = async function(req, res) {
    try{
        const { username, password } = req.body;
        const valid= await validation(username, password);

        if(valid === null){
            return res.send({
                status: 400,
                msg: 'Wrong username or password.'
            })
        }

        if(valid.auth === 'admin' || valid.auth === 'review'){
            const curToken = jwt.sign(
                {
                    username: req.body.username,
                    auth: valid.auth
                },
                    secretKey,
                {
                    expiresIn: '24h'
                }
            )
            console.log(`User uid ${valid.uid} login in.`);
            runtimeLog.info(`User uid ${valid.uid} login in.`);

            res.send({
                status: 202,
                msg: 'User login successfully.',
                username: req.body.username,
                auth: valid.auth,
                token: curToken
            })
        }else{
            res.send({
                status: 400,
                username: req.body.username,
                msg: 'Insufficient permissions.'
            })
        }
    } catch(err) {
        console.log('Error when logining in: ',err);
        runtimeLog.error('Error when logining in: ',err);
    }
}

module.exports = {login};