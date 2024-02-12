const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Schema } = mongoose;

const app = express();
const PORT = 5000;

const routes = require('./routes');

// Setup Multer for image uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });

app.use(bodyParser.json());

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Image uploaded successfully' });
});

app.use('/api', routes.api);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
