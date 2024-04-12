const multer = require('multer');
const uuid = require('uuid');
const {protocol, hostname, port} = require('../../config/hostConfig');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { filedname } = file;
    cb(null, `public/${filedname}`);
  },
  filename: function (req, file, cb) {
    //获取文件后缀名
    const extName = path.extname(file.originalname);
    const unique_name = uuid.v4() + extName;
    req.file = {
      ...req.file,
      url: protocol + '://' + hostname + ':' + port + `/public/tmp/${file.fieldname}/${unique_name}`
    }
    cb(null, unique_name)
  }
})

const upload = multer({ storage: storage });
const successCallback = (req, res) => {
  if(req.file){
    res.send({
      status: 200,
      url: req.file.url,
      mediaType: req.body.mediaType
    })
  }

};

module.exports = {upload, successCallback};
