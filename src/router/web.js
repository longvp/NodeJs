import express from "express";
import multer from "multer";
import path from "path";
import HomeController from "../controller/HomeController"

let router = express.Router();
let appRoot = require('app-root-path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, appRoot + '/src/public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

let uploadMultipleFiles = multer({
    storage: storage,
    fileFilter: imageFilter
}).array('multiple_images', 3);

const initWebRoute = (app) => {
    router.get('/', HomeController.getHomePage);
    router.get('/detail/user/:userId', HomeController.getDetailUser);
    router.post('/create-user', HomeController.createUser);
    router.get('/delete-user/:userId', HomeController.deleteUser);
    router.get('/edit-user/:userId', HomeController.getEditUser);
    router.post('/update-user/:userId', HomeController.updateUser);
    router.get('/upload-file', HomeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload.single('profile_pic'), HomeController.handleUploadFile);
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadMultipleFiles(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer file limit error here
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            }

            else {
                // make sure to call next() if all was well
                next();
            }
        })
    }, HomeController.handleUploadMultipleFile);
    return app.use('/', router);
}

export default initWebRoute;