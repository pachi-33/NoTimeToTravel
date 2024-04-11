const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { protocol, hostname, port } = require('./src/config/hostConfig');

const { prefix, travelDiary_urls, moderationPlatform_urls } = require('./src/config/InterfaceURL');
const { refreshToken } = require('./src/middleware/refreshToken');
const { verifyToken } = require('./src/middleware/verifyToken');
const { reviewRouter } = require('./src/routes/reviewRoutes');
const { travelDiaryRouter } = require('./src/routes/travelDiaryRoutes');
const { uploadRouter } = require('./src/routes/uploadRoutes');


const app = express();
const PORT = port;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname,'./public')));

app.get('*', (req, res, next) => {
  let data = req.query;
  req.data = {
    ...req.data,
    ...data
  };
  next();
})

app.post('*', (req, res, next) => {
  let data = req.body;
  req.data = {
    ...req.data,
    ...data
  };
  next();
})

app.use('/api/travelDiary/verification', verifyToken);
app.use('/api/moderationPlatform/verification', verifyToken);

app.use('/api', refreshToken);

app.use('/api' + travelDiary_urls.uploadFile, uploadRouter);
app.use('/api', reviewRouter);
app.use('/api', travelDiaryRouter);


app.use(function(req, res, next) {
    res.status(404).send("404 Not Found");
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
