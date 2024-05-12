const fs = require('fs');
const { PythonShell } = require('python-shell');
const path = require('path');
const bodyParser = require("body-parser");
const multer = require('multer');

const upload = multer({ dest: 'UploadedImages/' });

async function predictClassName(req, res) {
    const uploadedImage = req.file;
    const imagePath = path.join(__dirname, 'UploadedImages', uploadedImage.filename);
    const options = {
        pythonPath: 'C:\\Users\\janid\\AppData\\Local\\Programs\\Python\\Python311\\python.exe',
        scriptPath: 'C:\\Users\\janid\\OneDrive\\Documents\\Uni\\CCCU 23 24\\Final Year Project\\NodeServer\\server\\src\\UploadedImages',
        args: [imagePath]
    };

    let pyshell = new PythonShell('predict2.py', options);
    
    pyshell.on('message', function (message) {
        res.send(message);
    });
    
    pyshell.end(function (err, code, signal) {
        if (err) {
            console.error('Python script error:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Python script finished with code:', code);
    });
}

async function test(req, res) {
    return res.status(200).send('Hello');

};



module.exports = {
    predictClassName: upload.single('image'), predictClassName,
    test: test
};