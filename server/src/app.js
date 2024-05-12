const express = require("express");
const { PythonShell } = require('python-shell');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
const fs = require('fs');


// const predictRoute = require('./routes/predict.routes')

// app.use('/api/predict',predictRoute);

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src\\UploadedImages');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/api/predict/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image found in the request');
  }
  const imagePath = path.join(__dirname, 'UploadedImages', req.file.filename);
  console.log(imagePath)
  const options = {
    pythonPath: 'C:\\Users\\janid\\AppData\\Local\\Programs\\Python\\Python311\\python.exe',
    scriptPath: 'C:\\Users\\janid\\OneDrive\\Documents\\Uni\\CCCU 23 24\\Final Year Project\\NodeServer\\server\\src\\glyphFiles',
    args: [imagePath]
  };
  let pyshell = new PythonShell('predict2.py', options);
  pyshell.on('message', function (message) {
    console.log(message)
    res.send(message);
  });
  pyshell.end(function (err, code, signal) {
    if (err) {
      console.error('Python script error:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Python script finished with code:', code);
  });
});

const userRoutes = require('./routes/user.routes')

app.use('/api/user',userRoutes);


module.exports = app;