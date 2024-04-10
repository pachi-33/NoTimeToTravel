const {protocol, hostname, port} = require('./hostConfig');

const prefix = protocol + '://' + hostname + ':' + port;
const url_uploadFile = prefix + '/travelDiary/verification/uploadFile';

module.exports = {
    url_uploadFile
};