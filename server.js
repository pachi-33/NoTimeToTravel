const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.use(function(req, res, next) {
    res.status(404).send("404 Not Found");
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
